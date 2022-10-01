const { response } = require("express");
const { subirArchivo } = require("../helpers");



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

module.exports = {
    cargarArchivos
}