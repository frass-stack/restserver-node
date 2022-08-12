const { response, request } = require('express');
const { validationResult } = require('express-validator');
//Importamos el model usuario
const Usuario = require('../models/usuario')
//Importamos bjscriptjs para encriptar
const bjscriptjs = require('bcryptjs');


const userGet = (request, response) => {

    const { q, nombre = 'No name', page = 1, limit = 1  } = request.query;

    response.json({
        msg:'get API - controller ',
        q,
        nombre,
        page,
        limit
    });
};

const userPut = (request, response) => {

    const { id } = request.params;

    response.json({
        msg:'put API - controller',
        id
    });
};

const userPost = async (request, response) => {
    //Validacion de errores.
    const errors = validationResult(request);
    if( !errors.isEmpty() ){
        return response.status(400).json(errors);
    }
    
    const { nombre, correo, password, rol } = request.body;
    const usuario = new Usuario({ nombre, correo, password, rol });
    console.log(usuario);
    //Validamos que el email no exista previamente con otro user
    const emailExiste = await Usuario({ correo });
    if( emailExiste ){
        return response.status(400).json({
            msg: 'El correo ingresado ya se encuentra registrado'
        })
    }

    //Encriptamos el pass
    const salt = bjscriptjs.genSaltSync();
    usuario.password = bjscriptjs.hashSync(password, salt);
    //Guardamos en la db
    await usuario.save();

    response.json({
        usuario
    });
};

const userDelete = (request, response) => {
    response.json({
        msg:'delete API - controller'
    });
};

const userPatch = (request, response) => {
    response.json({
        msg:'patch API - controller'
    });
};

module.exports = {
    userGet,
    userPut,
    userPost,
    userDelete,
    userPatch
}