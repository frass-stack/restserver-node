const { response } = require("express");
const { uuid } = require('uuidv4');
const path = require('path');



const cargarArchivos = (req, resp = response) => {

    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
        resp.status(400).json({msg:'No files were uploaded.'});
        return;
    }

    console.log('req.files >>>', req.files); // eslint-disable-line

    const { archivo } = req.files;
    
    //Validamos la extension
    const nombreCortado = archivo.name.split('.');
    const extension = nombreCortado[nombreCortado.length - 1];
    const extensionesValidas = ['png', 'jpg', 'jpeg', 'gif'];
    if(!extensionesValidas.includes( extension )) return resp.json({
        msg: `La extension ${ extension }, no esta permitida. Las siguientes extensiones son validas: ${ extensionesValidas }.`
    })

    //Ubicar y cambiar nombre
    const nombreTemp = uuid() + `.${ extension }`
    const uploadPath = path.join(__dirname, '../uploads/' + nombreTemp);

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