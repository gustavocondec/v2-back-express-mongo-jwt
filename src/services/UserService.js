const userService = {}
const jwt = require("jsonwebtoken")
const User = require("../models/modelosBD/User")//importamos el modelo el usuario


userService.crearUsuario = async (CrearUsuarioModel) => {//recibe los datos correctos ya validados
    let emailUser = await User.findOne({ email: CrearUsuarioModel.email });
    if (emailUser) {//si el correo y esta registrado
        return false;
    } else {//creamos nuevo usuario
        const newUser = new User({
            nombres: CrearUsuarioModel.nombres,
            apellidos: CrearUsuarioModel.apellidos,
            telefono: CrearUsuarioModel.telefono,
            email: CrearUsuarioModel.email,
            password: CrearUsuarioModel.password
        })
        newUser.password = await newUser.encryptPassword(CrearUsuarioModel.password)
        await newUser.save()
        return true;
    }
}
userService.traerPerfil = async (idUsuario) => {
    try {
        let user = await User.findById(idUsuario);
        console.log(user)
        let { password, ...rest } = user.toObject();//devolvemos todos loos campos excepto password
        return rest;
    } catch (error) {
        return null;
    }
}
//cuando incia sesion
userService.generarToken = async (IniciarSesionModel) => {
    let user = await User.findOne({ email: IniciarSesionModel.email })//user es un documento
    if (user && await user.matchPassword(IniciarSesionModel.password)) {//si existe user y la contraseña coincide
        let token = jwt.sign(//firmamos el token
            {//primer parametro es payload
                //data que queremos firmar
                id: user.id,//guardamos el id en el toke, para hacer consultas siempre leeremos el id del token, no los pasados por parametros
                //en caso la ruta necesite el id, se debe de corroborar que sea el mismo del token, si no coinciden entonces error.
                email: user.email,
                extra: Date.now() * Math.random() * 1000//un dato aleatoriio extra para genera mayor complejidad
            },
            //segundo parametro es KEY
            process.env.KEY_SECRET,
            //tercer parametro son las opciones de token
            {
                expiresIn: "100 min",
            }
        )
        let { id, email } = user
        return {//retornamos un json con los valores que importan
            id, email, token
        }
    } else {
        return false;//es decir no coincide la contraseña o user no existe
    }
}
//metodo actualizar los datos del usario, recibe los datos a actualizar , y el id del usuario proveniente del token
userService.actualizar = async function (ActualizarUsuarioModel, userId) {
    console.log("datos compleots ", ActualizarUsuarioModel)
    let { email, password, id, _id, ...resto } = ActualizarUsuarioModel;//retiramos los campos que no se pueden cambiar
    console.log("datos a guardar ", resto);
    const user = await User.findByIdAndUpdate(userId, resto)
    if (user) {//si existe el usario. ¿si tiene token entonces si existe el usuario???
        //luego de actualizar devuelve user que esl doc sin modificar
        //por eso llamamos a traer perfil que devuelve un json o null
        return await this.traerPerfil(userId)
    }
    else {
        false
    }
}
module.exports = userService;