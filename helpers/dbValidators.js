const Role = require('../models/role');

const isRoleValid = async (rol = '') => {
    const existeRol = await Role.findOne({ rol });
    if( !existeRol ){
            throw new Error(`El rol ${rol} ingresado no es valido`);
    }
}

module.exports = {
    isRoleValid
}