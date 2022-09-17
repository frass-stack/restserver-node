const { Router } = require('express');
const { check } = require('express-validator');
//middlewares de validacion
const { validarJWT, validarCampos, esAdminRole, tieneRole } = require('../middlewares')
//controller
const { crearCategoria, categoriaDelete, categoriaPut, obtenerCategorias, obtenerCategoriaById } = require('../controllers/categoriasController');
const { isExistCategory } = require('../helpers/dbValidators');

const router = Router();

//Obtener todas las categorias - publico
router.get('/', obtenerCategorias)

//Obtener categoria por id - publico
router.get('/:id',
    [check('id', 'No es un id valido').isMongoId(),
    check('id').custom( isExistCategory )],
    obtenerCategoriaById)

//Crear categoria - privado - cualquier usuario con token valido
router.post('/', 
    [validarJWT,
    esAdminRole,
    // tieneRole('ADMIN_ROLE'),
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos],
    crearCategoria)

//Actualizar categoria por id - privado - cualquier usuario con token valido
router.put('/:id',[
    validarJWT,
    esAdminRole,
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom( isExistCategory ),
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos],
    categoriaPut
)

//Borrar categoria por id - admin role
router.delete('/:id',[
    validarJWT,
    esAdminRole,
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom( isExistCategory ),
    validarCampos], 
    categoriaDelete)


module.exports = router