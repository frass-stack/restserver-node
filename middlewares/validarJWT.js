const { request, response } = require("express");
const jwt = require('jsonwebtoken');

const validarJWT = ( req= request, resp= response, next ) => {

    const token = req.header('x-token');

    if( !token ){
        return resp.status(401).json({
            msg:'No hay token en la peticion.'
        })
    }

    try {
        const { uid } = jwt.verify( token, process.env.SECRETORPRIVATEKEY )

        req.uid = uid;

        next();
    } catch (error) {
        console.log(error);
        resp.status(401).json({
            msg:'Token no valido.'
        })
    }
}

module.exports = {
    validarJWT
}