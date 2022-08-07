const { response, request } = require('express');
//Importamos el model usuario
const Usuario = require('../models/usuario')



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
    
    const body = request.body;
    const usuario = new Usuario(body);
    console.log(usuario);
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