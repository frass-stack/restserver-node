const { request, response } =  require("express");
const { Producto } = require('../models')


//Obtener producto - paginado - populate
const obtenerProductos = async (  req = request, resp = response ) => {
    const { limite = 5, desde = 0 } = req.body;
    if( isNaN(desde) || isNaN(limite) ){
        // throw new Error(`Los parametros ${desde} o ${limite}, deben ser numeros.`);
        response.status(400).json({
            msg:`Los parametros deben ser numeros.`
        })
    }
    const [total, productos] = await Promise.all([
        Producto.countDocuments({ estado:true }),
        Producto.find({ estado:true })
            .populate('usuario', 'nombre')
            .populate('categoria', 'nombre')
            .skip(Number(desde))
            .limit(Number(limite))
    ]);

    resp.json({
        total,
        productos
    });
}
//Obtener producto - populate
const obtenerProductoById = async (   req = request, resp = response ) => {
    const { id } = req.params;
    
    const producto = await Producto.findById( id )
        .populate('usuario', 'nombre')
        .populate('categoria', 'nombre');

    if( !producto ){
        resp.json({
            msg:`Producto con ${ id }, no encontrado.`
        })
    }
    resp.json({
        producto
    })
}

const crearProducto = async ( req = request, resp = response ) => {
    const { estado, usuario, ...body } = req.body;
    const productoDB = await Producto.findOne({ nombre: body.nombre });

    if( productoDB ){
        resp.status(400).json({
            msg:`El producto ${ productoDB.nombre } ya existe.`
        })
    }

    //Generar la data a guardar
    const data = {
        ...body,
        usuario: req.usuario._id
    }
    console.log(data)

    //Guardar en la DB
    const producto = new Producto( data );
    await producto.save();
    resp.status(201).json(producto);
}

//ActualziarProducto - privado - admin
const productoPut = async (request, response) => {
    const { id } = request.params;
    //Desestructuramos los parametros que no queremos modificar
    const { estado, usuario, ...body } = request.body;
    body.usuario = request.usuario._id;

    const producto = await Producto.findByIdAndUpdate(id, body, {new:true});
    //console.log(producto)

    response.json({
        producto
    });
};

//BorrarCategoria - privado - admin
const productoDelete = async (request, response) => {
    const { id } = request.params;

    const producto = await Producto.findByIdAndUpdate(id, { estado: false } );
    const usuarioAutenticado = request.usuario;

    response.json({ producto, usuarioAutenticado });
}

module.exports = {
    obtenerProductos,
    obtenerProductoById,
    crearProducto,
    productoPut,
    productoDelete
}