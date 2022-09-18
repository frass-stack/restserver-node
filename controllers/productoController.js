const { request, response } =  require("express")
const { Producto } = require('../models')


//Obtener producto - paginado - populate
const obtenerProducto = async (  req = request, resp = response ) => {
}
//Obtener producto - populate
const obtenerProductoById = async (   req = request, resp = response ) => {
}

const crearProducto = async ( req = request, resp = response ) => {
}

//ActualziarProducto - privado - admin
const productoPut = async (request, response) => {
};

//BorrarCategoria - privado - admin
const productoDelete = async (request, response) => {
}

module.exports = {
    obtenerProducto,
    obtenerProductoById,
    crearProducto,
    productoPut,
    productoDelete
}