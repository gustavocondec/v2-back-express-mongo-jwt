//express-jwt lee las peticiones y si tiene un token lo valida ,si es valido guarda la data firmada en req.user
const expressJwt = require("express-jwt")
module.exports = jwt;

function jwt () {
    const secret = process.env.KEY_SECRET
    return expressJwt({ secret })
        .unless({
            path: [//las rutas que no estan protegidas
                "/usuarios"
            ]
        })
}
/*
async function isRevoked (req, payload, done) {
    const user =
    //const user
    if (!user) {
        return done(null, true);
    }
    done()
}*/