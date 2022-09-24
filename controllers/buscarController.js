const { response, request } = require("express");

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

    switch (key) {
        case 'usuarios':

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