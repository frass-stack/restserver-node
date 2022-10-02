

const validarCampos  = require('../middlewares/validarCampos');
const validarJWT  = require('../middlewares/validarJWT');
const  validarRoles  = require('../middlewares/validarRole');
const validarArchivo = require('../middlewares/validarArchivo')

module.exports = {
    ...validarCampos,
    ...validarJWT,
    ...validarRoles,
    ...validarArchivo
}