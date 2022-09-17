//Importamos el model usuario
const Usuario = require('../models/usuario')
//Importamos bjscriptjs para encriptar
const bjscriptjs = require('bcryptjs');

const userGet = async (request, response) => {

    //Desestructuramos los parametros de la paginacion.
    const { limite = 5, desde = 0 } = request.query;
    //Buscamos los usuarios.
    if( isNaN(desde) || isNaN(limite) ){
        // throw new Error(`Los parametros ${desde} o ${limite}, deben ser numeros.`);
        response.status(400).json({
            msg:`Los parametros deben ser numeros.`
        })
    }
    // const usuarios = await Usuario.find({ estado: true })
    //     .skip(Number(desde))
    //     .limit(Number(limite));
    // const total = await Usuario.countDocuments({ estado: true })

    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments({ estado: true }),
        Usuario.find({ estado: true })
                .skip(Number(desde))
                .limit(Number(limite))
    ]);

    response.json({
        total,
        usuarios
    });
};

const userPut = async (request, response) => {

    const { id } = request.params;
    //Desestructuramos los parametros que no queremos modificar
    const { _id, google, correo, password, estado, ...resto } = request.body;
    //Encriptamos la contraseña
    if (password) {
        const salt = bjscriptjs.genSaltSync();
        resto.password = bjscriptjs.hashSync(password, salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto);

    response.json({
        usuario
    });
};

const userPost = async (request, response) => {

    const { nombre, correo, password, rol } = request.body;
    const usuario = new Usuario({ nombre, correo, password, rol });
    console.log(usuario);

    //Encriptamos el pass
    const salt = bjscriptjs.genSaltSync();
    usuario.password = bjscriptjs.hashSync(password, salt);
    //Guardamos en la db
    await usuario.save();

    response.json({
        usuario
    });
};

const userDelete = async (request, response) => {
    
    const { id } = request.params;

    //Borrado Fisico de la BD
    // const usuario = await Usuario.findByIdAndDelete(id);

    const usuario = await Usuario.findByIdAndUpdate(id, { estado: false });
    const usuarioAutenticado = request.usuario;

    response.json({ usuario, usuarioAutenticado });
};

const userPatch = (request, response) => {
    response.json({
        msg: 'patch API - controller'
    });
};

module.exports = {
    userGet,
    userPut,
    userPost,
    userDelete,
    userPatch
}