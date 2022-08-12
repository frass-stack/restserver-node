const { Router } = require('express');
const { check } = require('express-validator');
const { userGet, 
        userPut, 
        userPost, 
        userDelete, 
        userPatch } = require('../controllers/userController');
const { validarCampos } = require('../middlewares/validarCampos');
const Role = require('../models/role');

const router = Router();

router.get('/', userGet );
router.put('/:id', userPut );
router.post('/', [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('correo', 'El correo ingresado no es valido').isEmail(),
        check('password', 'El password debe contener al menos 6 caracteres').isLength({ min:6 }),
        // check('rol', 'El rol no es valido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
        check('rol').custom( async (rol = '') => {
                const existeRol = await Role.findOne({ rol });
                if( !existeRol ){
                        throw new Error(`El rol ${rol} ingresado no es valido`);
                }
        }),
        validarCampos
], userPost );
router.delete('/', userDelete );
router.patch('/', userPatch );


module.exports = router;