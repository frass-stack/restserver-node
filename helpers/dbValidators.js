const { Categoria, Role, Usuario, Producto } = require('../models');

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

const isExistCategoryPorId = async ( id = '' ) => {
    const categoriaExiste = await Categoria.findById(id);
    if( !categoriaExiste ){
        throw new Error(`La categoria con id: ${id}, no se encuentra registrada.`)
    }
}

const isExistProductPorId = async ( id = '' ) => {
    const productoExiste = await Producto.findById(id);
    if( !productoExiste ){
        throw new Error(`El producto con id: ${id}, no se encuentra registrado.`)
    }
}

/**
 * validar colecciones
 */
const coleccionesPermitidas = (coleccion = '', colecciones = []) => {
    const incluida = colecciones.includes( coleccion );
    if(!incluida){
        throw new Error(`La coleccion ${ coleccion }, no esta entre las colecciones ${ colecciones }.`);
    }
    //A diferencia de las otras validaciones custom, aqui en el check, le llega una fn con argumentos, por lo que debemos retornar un true si todo sale bien.
    return true;
}

module.exports = {
    isRoleValid,
    isExistEmail,
    isExistUser,
    isExistCategoryPorId,
    isExistProductPorId,
    coleccionesPermitidas
}