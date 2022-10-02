const { Router } = require('express');
const { check } = require('express-validator');
const { cargarArchivos, actualizarImagen } = require('../controllers/uploadController');
const { coleccionesPermitidas } = require('../helpers');
const { validarCampos, validarArchivo } = require('../middlewares');

const router = Router();

//endpoints
router.post('/', validarArchivo ,cargarArchivos)
router.put('/:coleccion/:id', [
    validarArchivo,
    check('id','La id debe ser valida').isMongoId(),
    check('coleccion').custom(c => coleccionesPermitidas(c, ['user', 'productos'])),
    validarCampos
] ,actualizarImagen)

module.exports = router;