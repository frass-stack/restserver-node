const { Router } = require('express');
const { check } = require('express-validator');
//controllers
const { userGet, 
        userPut, 
        userPost, 
        userDelete, 
        userPatch } = require('../controllers/userController');
//helpers
const { isRoleValid, isExistEmail, isExistUser } = require('../helpers/dbValidators');
//middlewares
const { validarCampos, validarJWT, esAdminRole, tieneRole } = require('../middlewares')

const router = Router();
//endpoints
router.get('/', userGet );
router.put('/:id',[
        check('id', 'No es un id valido').isMongoId(),
        check('id').custom( isExistUser ),
        check('rol').custom( isRoleValid ),
        validarCampos
], userPut );
router.post('/', [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('correo', 'El correo ingresado no es valido').isEmail(),
        check('correo').custom( isExistEmail ),
        check('password', 'El password debe contener al menos 6 caracteres').isLength({ min:6 }),
        // check('rol', 'El rol no es valido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
        check('rol').custom( isRoleValid ),
        validarCampos
], userPost );
router.delete('/:id',[
        validarJWT,
        //esAdminRole,
        tieneRole('ADMIN_ROLE', 'VENTAS_ROLE'),
        check('id', 'No es un id valido').isMongoId(),
        check('id').custom( isExistUser ),
        validarCampos
], userDelete );
router.patch('/', userPatch );


module.exports = router;