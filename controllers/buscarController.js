const { response, request } = require("express");
const { buscarUsuarios } = require("../helpers/busquedas");


const coleccionesPermitidas = [
    'user',
    'categorias',
    'productos',
    'roles'
];

const buscar = (req = request, resp = response) => {

    const { collection, term } = req.params;

    if (!coleccionesPermitidas.includes(collection)) {
        resp.status(400).json({
            msg: `Las colecciones permitidas son ${coleccionesPermitidas}`
        });
    }

    switch (collection) {
        case 'user':
            buscarUsuarios(term, resp)
            break;
        case 'categorias':

            break;
        case 'productos':

            break;
        default:
            resp.status(500).json({
                msg:`Se le olvido realizar la busqueda.`
            })
            break;
    }
}

module.exports = {
    buscar
}