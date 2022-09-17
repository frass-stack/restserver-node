const { Categoria, Role, Usuario } = require('../models');

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

const isExistUser = async ( id = '' ) => {
    const userExiste = await Usuario.findById(id);
    if( !userExiste ){
        throw new Error(`El usuario con id: ${id}, no se encuentra registrado.`)
    }
}

const isExistCategory = async ( id = '' ) => {
    const categoriaExiste = await Categoria.findById(id);
    if( !categoriaExiste ){
        throw new Error(`La categoria con id: ${id}, no se encuentra registrada.`)
    }
}

module.exports = {
    isRoleValid,
    isExistEmail,
    isExistUser,
    isExistCategory
}