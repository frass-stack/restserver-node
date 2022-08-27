const { response } = require("express");
const bcriptjs = require('bcryptjs');

const Usuario = require("../models/usuario");
const { generarJWT } = require("../helpers/generarJWT");



const login = async (req, res = response) => {

    const { correo, password } = req.body;

    try {

        const usuario = await Usuario.findOne( {correo} );

        //Validar la existencia de usuario
        if(!usuario){
            return res.status(400).json({
                msg:'Usuario / Password incorrectos o no existen en el Sistema. - correo'
            })
        }

        //Validar el estado del usuario
        if(!usuario.estado){
            return res.status(400).json({
                msg:'Usuario / Password incorrectos o no existen en el Sistema. - estado:false'
            })
        }

        //validar el password del usuario
        const validPassword = bcriptjs.compareSync( password, usuario.password )

        if( !validPassword ){
            return res.status(400).json({
                msg:'Usuario / Password incorrectos o no existen en el Sistema. - password'
            })
        }

        //Generar el token
        const token = await generarJWT(  usuario.id );

        res.json({
            usuario,
            token
        })
    } catch (error) {
        res.status(500).json({
            msg: 'Hable con el administrador.'
        })
    }
}

module.exports = {
    login
}