const path = require('path')
const fs = require('fs')
const cloudinary = require('cloudinary').v2
const { response } = require("express");
const { subirArchivo } = require("../helpers");
const { Usuario, Producto } = require('../models');

//Autenticamos BackEnd con cloudinary
cloudinary.config(process.env.CLOUDINARY_URL)


const cargarArchivos = async (req, resp = response) => {

    //Imagenes
    const pathCompleto = await subirArchivo(req.files, undefined, 'imgs');

    resp.json({
        nombre: pathCompleto
    })
}

const actualizarImagenCloudinary = async (req, resp = response) => {

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

    //Borrar imagen del servidor (si existe).
    if( modelo.img ){

    }

    const { tempFilePath } = req.files.archivo;
    const { secure_url } = await cloudinary.uploader.upload( tempFilePath )

    modelo.img = secure_url;

    await modelo.save();

    resp.json({
        modelo
    });
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

    //Borrar imagen del servidor (si existe).
    if( modelo.img ){
        const pathImagen = path.join(__dirname, '../uploads', coleccion, modelo.img);
        if( fs.existsSync( pathImagen ) ){
            fs.unlinkSync( pathImagen );
        }
    }

    const pathCompleto = await subirArchivo(req.files, undefined, coleccion);
    modelo.img = pathCompleto;

    await modelo.save();

    resp.json({
        modelo
    });
}

const mostrarImagen = async ( req, resp = response ) => {
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

    //Mostrar la imagen del servidor si existe
    if( modelo.img ){
        const pathImagen = path.join(__dirname, '../uploads', coleccion, modelo.img);
        if( fs.existsSync( pathImagen ) ){
            return resp.sendFile( pathImagen )
        }
    }else{
        const pathImagen = path.join(__dirname, '../assets/no-image.jpg');
        return resp.sendFile( pathImagen )
    }
}

module.exports = {
    cargarArchivos,
    actualizarImagen,
    mostrarImagen,
    actualizarImagenCloudinary
}