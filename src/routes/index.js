/*listado de rutas que tenemos en el sistema*/
const express = require("express")
const router = express.Router();

const user = require("../controllers/userController")
//las rutas de nuestro aplicacion web
module.exports = app => {
    //user
    router.post("/usuarios", user.register)//para registrarse
    router.get("/usuarios", user.login) //para iniciar sesion
    router.get("/usuarios/:id", user.perfil)//obtine los datos del usuario :id (aunque realmente del token)
    router.put("/usuarios/:id", user.actualizar)//actualiza los datos del usuario :id (pero usa el dato del token)

    //


    app.use(router) //
}