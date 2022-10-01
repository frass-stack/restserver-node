

const dbValidators = require('./dbValidators');
const busquedas = require('./busquedas');
const generarJWT = require('./generarJWT');
const googleVerify = require('./googleVerify');
const subirArchivo = require('./subirArchivo');

module.exports = {
    ...dbValidators,
    ...busquedas,
    ...generarJWT,
    ...googleVerify,
    ...subirArchivo
}