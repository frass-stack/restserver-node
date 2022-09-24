const { ObjectId } = require('mongoose').Types;
const { Usuario } = require("../models");

const buscarUsuarios = async (termino, resp = response) => {
    const isMongoID = ObjectId.isValid(termino)

    if(isMongoID) {
        const usuario = await Usuario.findById(termino)
        resp.json({
            results: (usuario) ? [usuario]:[]
        })
    }

    const regex = new RegExp(termino, 'i');

    const usuarios = await Usuario.find({
        $or: [{nombre: regex}, {correo: regex}],
        $and: [{estado: true}]
    })
}

module.exports = {
    buscarUsuarios
}