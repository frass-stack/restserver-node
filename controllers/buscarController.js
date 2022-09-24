const { response, request } = require("express");
const { buscarUsuarios, buscarCategorias, buscarProductos } = require("../helpers/busquedas");


const coleccionesPermitidas = [
    'usuarios',
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
        case 'usuarios':
            buscarUsuarios(term, resp)
            break;
        case 'categorias':
            buscarCategorias(term, resp)
            break;
        case 'productos':
            buscarProductos(term, resp)
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