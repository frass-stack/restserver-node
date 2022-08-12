const { validationResult } = require('express-validator');

const validarCampos = (request, response, next) => {
    //Validacion de errores.
    const errors = validationResult(request);
    if( !errors.isEmpty() ){
        return response.status(400).json(errors);
    }

    next();
}

module.exports = {
    validarCampos
}