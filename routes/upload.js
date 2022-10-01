const { Router } = require('express');
const { check } = require('express-validator');
const { cargarArchivos } = require('../controllers/uploadController');
const { validarCampos } = require('../middlewares/validarCampos');

const router = Router();

//endpoints
router.post('/', cargarArchivos)

module.exports = router;