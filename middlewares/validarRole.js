const { response } = require("express");


const esAdminRole = ( req, resp = response, next ) => {
    
    if(!req.usuario){
        return resp.status(500).json({
            msg: 'Se quiere verificar el rol sin validar el token primero!.'
        })
    }

    const { rol, nombre } = req.usuario;

    if( !rol !== 'ADMIN_ROLE' ){
        return resp.status(401).json({
            msg:`El usuario ${ nombre } no tiene rol de administrador.`
        })
    }
}

const tieneRole = ( ...roles ) => {
    return (req, resp=response, next) => {
        
        if(!req.usuario){
            return resp.status(500).json({
                msg: 'Se quiere verificar el rol sin validar el token primero!.'
            })
        }
    
        if( !roles.includes( req.usuario.rol ) ){
            return resp.status(401).json({
                msg:`El servicio requiere uno de estos roles: ${roles}.`
            })
        }
    
        next();
    }
}

module.exports = {
    esAdminRole,
    tieneRole
}