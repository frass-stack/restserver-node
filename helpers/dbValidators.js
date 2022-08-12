const Role = require('../models/role');
const Usuario = require('../models/usuario');

const isRoleValid = async (rol = '') => {
    const existeRol = await Role.findOne({ rol });
    if( !existeRol ){
            throw new Error(`El rol ${rol} ingresado no es valido`);
    }
}

const isExistEmail = async ( correo = '' ) => {
    const emailExiste = await Usuario.findOne({ correo });
    if( emailExiste ){
        throw new Error(`El correo ${correo} ya se encuentra registrado con otro usuario.`)
    }
}

module.exports = {
    isRoleValid,
    isExistEmail
}