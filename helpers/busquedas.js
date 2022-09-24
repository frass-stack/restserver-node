const { ObjectId } = require('mongoose').Types;
const { Usuario, Categoria, Producto } = require("../models");

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
    resp.json({usuarios})
}

const buscarCategorias = async (termino, resp = response) => {
    const isMongoID = ObjectId.isValid(termino)

    if(isMongoID) {
        const categoria = await Categoria.findById(termino)
        resp.json({
            results: (categoria) ? [categoria]:[]
        })
    }

    const regex = new RegExp(termino, 'i');

    const categorias = await Categoria.find({
        $or: [{nombre: regex}],
        $and: [{estado: true}]
    })
    resp.json({
        results: categorias
    })
}

const buscarProductos = async (termino, resp = response) => {
    const isMongoID = ObjectId.isValid(termino)

    if(isMongoID) {
        const producto = await Producto.findById(termino)
        resp.json({
            results: (producto) ? [producto]:[]
        })
    }

    const regex = new RegExp(termino, 'i');

    const productos = await Producto.find({
        $or: [{nombre: regex}],
        $and: [{estado: true}]
    })
    resp.json({
        results: productos
    })
}

module.exports = {buscarUsuarios, buscarCategorias, buscarProductos} 
