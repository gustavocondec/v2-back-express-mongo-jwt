class CrearUsuarioModel {
    constructor(usuario) {
        this.nombres = usuario.nombres;
        this.apellidos = usuario.apellidos;
        this.telefono = usuario.telefono;
        this.email = usuario.email;
        this.password = usuario.password;
    }
    nombres = ""
    apellidos = ""
    telefono = ""
    email = ""
    password = ""
    //funcion que verfica que los datos sean correctos y no vacios
    datosValidos () {
        return true;
    }
}

module.exports = CrearUsuarioModel