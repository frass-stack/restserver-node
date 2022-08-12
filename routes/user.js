const { Router } = require('express');
const { check } = require('express-validator');
//controllers
const { userGet, 
        userPut, 
        userPost, 
        userDelete, 
        userPatch } = require('../controllers/userController');
//helpers
const { isRoleValid } = require('../helpers/dbValidators');
//middlewares
const { validarCampos } = require('../middlewares/validarCampos');

const router = Router();
//endpoints
router.get('/', userGet );
router.put('/:id', userPut );
router.post('/', [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('correo', 'El correo ingresado no es valido').isEmail(),
        check('password', 'El password debe contener al menos 6 caracteres').isLength({ min:6 }),
        // check('rol', 'El rol no es valido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
        check('rol').custom( isRoleValid ),
        validarCampos
], userPost );
router.delete('/', userDelete );
router.patch('/', userPatch );


module.exports = router;