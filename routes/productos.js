const { Router } = require('express');
const { check } = require('express-validator');

const router = Router();

router.get('/', (req, resp) => {
    resp.json('get - producto')
})

//Obtener categoria por id - publico
router.get('/:id', (req, resp) => {
    resp.json('get by id - producto')
})

//Crear categoria - privado - cualquier usuario con token valido
router.post('/', (req, resp) => {
    resp.json('post - producto')
})

//Actualizar categoria por id - privado - cualquier usuario con token valido
router.put('/:id', (req, resp) => {
    resp.json('put - producto')
})

//Borrar categoria por id - admin role
router.delete('/:id', (req, resp) => {
    resp.json('delete - producto')
})


module.exports = router