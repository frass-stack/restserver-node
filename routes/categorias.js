const { Router } = require('express');
const { check } = require('express-validator');
//middlewares de validacion
const { validarJWT, validarCampos } = require('../middlewares')
//controller
const { crearCategoria } = require('../controllers/categoriasController')

const router = Router();

//Obtener todas las categorias - publico
router.get('/', (req, resp) => {
    resp.json('todo bien')
})

//Obtener categoria por id - publico
router.get('/:id', (req, resp) => {
    resp.json('todo bien')
})

//Crear categoria - privado - cualquier usuario con token valido
router.post('/', 
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos,
    crearCategoria)

//Actualizar categoria por id - privado - cualquier usuario con token valido
router.put('/:id', (req, resp) => {
    resp.json('todo bien')
})

//Borrar categoria por id - admin role
router.delete('/:id', (req, resp) => {
    resp.json('todo bien')
})


module.exports = router