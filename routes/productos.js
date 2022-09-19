const { Router } = require('express');
const { check } = require('express-validator');
const { crearProducto, obtenerProductos, obtenerProductoById, productoPut, productoDelete } = require('../controllers/productoController');
const { isExistCategoryPorId, isExistProductPorId } = require('../helpers/dbValidators');
const { validarJWT, esAdminRole, validarCampos } = require('../middlewares');

const router = Router();

router.get('/', obtenerProductos)

//Obtener categoria por id - publico
router.get('/:id',[
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom( isExistProductPorId ),
    validarCampos
] , obtenerProductoById)

//Crear categoria - privado - cualquier usuario con token valido
router.post('/',[
    validarJWT,
    esAdminRole,
    check('categoria', 'No es un id valido').isMongoId(), //La _id de categoria esta nombrada como 'categoria' en el modelo Producto
    check('categoria').custom( isExistCategoryPorId ), //La _id de categoria esta nombrada como 'categoria' en el modelo Producto
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos], 
    crearProducto)

//Actualizar categoria por id - privado - cualquier usuario con token valido
router.put('/:id',[
    validarJWT,
    esAdminRole,
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom( isExistProductPorId ),
    validarCampos
] ,productoPut)

//Borrar categoria por id - admin role
router.delete('/:id',[
    validarJWT,
    esAdminRole,
    check('id').custom( isExistProductPorId ),
    validarCampos
] ,productoDelete)

module.exports = router