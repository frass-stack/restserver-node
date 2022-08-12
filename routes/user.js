const { Router } = require('express');
const { check } = require('express-validator');
const { userGet, 
        userPut, 
        userPost, 
        userDelete, 
        userPatch } = require('../controllers/userController');

const router = Router();

router.get('/', userGet );
router.put('/:id', userPut );
router.post('/', [
        check('correo', 'El correo ingresado no es valido').isEmail(),
], userPost );
router.delete('/', userDelete );
router.patch('/', userPatch );


module.exports = router;