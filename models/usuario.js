//Representacion del modelo:
/*{
    nombre:'user',
    correo: 'user@user.com',
    password:'12345',
    img:'1234566767',
    rol:'1234556678',
    estado:false, // true:activo, false:eliminado
    google:false //true:creado mediante google, false:creado mediante app
}*/

const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema({
    nombre: {
        type: String,
        required:[true, 'El nombre es requerido']
    },
    correo: {
        type: String,
        required:[true, 'El correo es requerido'],
        unique: true
    },
    password: {
        type: String,
        required:[true, 'El password es requerido']
    },
    img: {
        type: String,
    },
    rol: {
        type: String,
        required:true,
        enum:['ADMIN_ROLE', 'USER_ROLE', 'VENTAS_ROLE'],
        default: 'USER_ROLE'
    },
    estado: {
        type: Boolean,
        default:true
    },
    google: {
        type: Boolean,
        default:false
    }
});

//Eliminamos el password y la version del registro al retornar la informacion
UsuarioSchema.methods.toJSON = function(){
    const { __v, password, _id,...usuario } = this.toObject();
    usuario.uid = _id;
    return usuario;
}

module.exports = model('Usuario', UsuarioSchema);