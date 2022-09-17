const { request, response } =  require("express")
const { Categoria } = require('../models')


//Obtener categorias - paginado - populate
//Obtener categoria - populate
//ActualziarCategoria
//BorrarCategoria

const crearCategoria = async ( req = request, resp = response ) => {
    const nombre = req.body.nombre;
    const categoriaDB = await Categoria.findOne({ nombre });

    if( categoriaDB ){
        resp.status(400).json({
            msg:`La categoria ${ categoriaDB.nombre } ya existe.`
        })
    }

    //Generar la data a guardar
    const data = {
        nombre,
        usuario: req.usuario._id
    }
    console.log(data)

    //Guardar en la DB
    const categoria = new Categoria( data );
    await categoria.save();
    resp.status(201).json(categoria);
}

module.exports = {
    crearCategoria
}