const { response, json } = require("express");
const bcriptjs = require('bcryptjs');

const Usuario = require("../models/usuario");
const { generarJWT } = require("../helpers/generarJWT");
const { googleVerify } = require("../helpers/googleVerify");



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

const googleSignIn = async ( req, resp = response ) => {

    const { id_token } = req.body;

    try {
        const { nombre, img, correo } = await googleVerify( id_token );
        //console.log(nombre, img, correo)

        let usuario = await Usuario.findOne({ correo });

        //Si el usuario no existe y se busca loguear
        if(!usuario){
            //Genero un nuevo usuario
            const data = {
                nombre,
                correo,
                img,
                password: ':p',
                rol,
                google: true
            };
            usuario = new Usuario( data );
            await usuario.save();
        }

        //Si el usuario fue inhabilitado
        if(!usuario.estado){
            return resp.status(401).json({
                ok:false,
                msg:'Hable con el administrador. Usuario bloqueado.'
            });
        }

        //Generamos el token
        const token = await generarJWT(  usuario.id );

        resp.json({
            token,
            usuario
        })
    } catch (error) {
        resp.status(400).json({
            ok:false,
            msg:'El token no se pudo verificar.'
        })
    }
}

module.exports = {
    login,
    googleSignIn
}