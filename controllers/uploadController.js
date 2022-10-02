const { response } = require("express");
const { subirArchivo } = require("../helpers");
const { Usuario, Producto } = require('../models')


const cargarArchivos = async (req, resp = response) => {

    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
        resp.status(400).json({msg:'No files were uploaded.'});
        return;
    }

    //Imagenes
    const pathCompleto = await subirArchivo(req.files, undefined, 'imgs');

    resp.json({
        nombre: pathCompleto
    })
}

const actualizarImagen = async (req, resp = response) => {

    const { coleccion, id } = req.params;

    let modelo;

    switch (coleccion) {
        case 'user':
            modelo = await Usuario.findById(id)
            if(!modelo){
                return resp.status(400).json({msg:`No existe un usuario con la ${id}`});
            }
            break;

        case 'productos':
            modelo = await Producto.findById(id)
            if(!modelo){
                return resp.status(400).json({msg:`No existe un producto con la ${id}`});
            }
            break;
    
        default:
            return resp.status(500).json({msg:'Se me olvido validar esto.'});
    }

    const pathCompleto = await subirArchivo(req.files, undefined, coleccion);
    modelo.img = pathCompleto;

    await modelo.save();

    resp.json({
        modelo
    });
}

module.exports = {
    cargarArchivos,
    actualizarImagen
}