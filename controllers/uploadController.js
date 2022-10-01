const { response } = require("express");
const path = require('path');



const cargarArchivos = (req, resp = response) => {

    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
        resp.status(400).json({msg:'No files were uploaded.'});
        return;
    }

    console.log('req.files >>>', req.files); // eslint-disable-line

    const { archivo } = req.files;

    const uploadPath = path.join(__dirname, '../uploads/' + archivo.name);

    archivo.mv(uploadPath, (err) => {
        if (err) {
            return resp.status(500).json(err);
        }

        resp.json({msg: 'File uploaded to ' + uploadPath});
    });
}

module.exports = {
    cargarArchivos
}