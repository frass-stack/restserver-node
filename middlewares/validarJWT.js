const { request, response } = require("express");
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');

const validarJWT = async ( req= request, resp= response, next ) => {

    const token = req.header('x-token');

    if( !token ){
        return resp.status(401).json({
            msg:'No hay token en la peticion.'
        })
    }

    try {
        const { uid } = jwt.verify( token, process.env.SECRETORPRIVATEKEY )

        //Leer la informacion del usuario autenticado.
        const usuario = await Usuario.findById(uid);

        //Verificar existencia de usuario
        if( !usuario ){
            return resp.status(401).json({
                msg:'Token no valido - usuario no existe en la DB.'
            })
        }

        //Verificar estado de usuario (debe ser true)
        if( !usuario.estado ){
            return resp.status(401).json({
                msg:'Token no valido - usuario con estado=false.'
            })
        }

        req.usuario = usuario;

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