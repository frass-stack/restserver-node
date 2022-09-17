const { request, response } =  require("express")
const { Categoria } = require('../models')


//Obtener categorias - paginado - populate
const obtenerCategorias = async (  req = request, resp = response ) => {
    const { limite = 5, desde = 0 } = req.body;
    if( isNaN(desde) || isNaN(limite) ){
        // throw new Error(`Los parametros ${desde} o ${limite}, deben ser numeros.`);
        response.status(400).json({
            msg:`Los parametros deben ser numeros.`
        })
    }
    const [total, categorias] = await Promise.all([
        Categoria.countDocuments({ estado:true }),
        Categoria.find({ estado:true })
            .populate('usuario', 'nombre')
            .skip(Number(desde))
            .limit(Number(limite))
    ]);

    resp.json({
        total,
        categorias
    });
}
//Obtener categoria - populate
const obtenerCategoriaById = async (   req = request, resp = response ) => {
    const { id } = req.params;
    
    const categoria = await Categoria.findById( id )
        .populate('usuario', 'nombre');

    if( !categoria ){
        resp.json({
            msg:`Categoria con ${ id }, no encontrada.`
        })
    }
    resp.json({
        categoria
    })
}

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

//ActualziarCategoria
const categoriaPut = async (request, response) => {

    const { id } = request.params;
    //Desestructuramos los parametros que no queremos modificar
    const { estado, usuario, ...resto } = request.body;
    resto.usuario = request.usuario._id;

    const categoria = await Categoria.findByIdAndUpdate(id, resto, {new:true});
    //console.log(categoria)

    response.json({
        categoria
    });
};

//BorrarCategoria
const categoriaDelete = async (request, response) => {
    const { id } = request.params;

    const categoria = await Categoria.findByIdAndUpdate(id, { estado: false });
    const usuarioAutenticado = request.usuario;

    response.json({ categoria, usuarioAutenticado });
}

module.exports = {
    crearCategoria,
    obtenerCategorias,
    obtenerCategoriaById,
    categoriaPut,
    categoriaDelete
}