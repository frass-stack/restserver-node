const { response } = require("express");


const validarArchivo = (req, resp = response, next) => {
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
        return resp.status(400).json({msg:'No files were uploaded.'});
    }

    next();
}

module.exports = {
    validarArchivo
}