const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/configDB');
const fileUpload = require('express-fileupload');

class Server {
    
    constructor(){
        this.app = express();
        this.port = process.env.PORT;

        this.paths = {
            authPath: '/api/auth',
            userPath: '/api/users',
            buscarPath: '/api/buscar',
            productoPath: '/api/productos',
            categoriasPath: '/api/categorias',
            uploadsPath: '/api/uploads'
        }

        //Conectar a la DB
        this.conectarDB();

        //Middlewares
        this.middlewares();

        //Rutas
        this.routes();
    }

    async conectarDB(){
        await dbConnection();
    }

    middlewares(){
        //CORS
        this.app.use(cors());

        //Lectura y Parseo del json
        this.app.use( express.json() );

        //Directorio publico
        this.app.use(express.static('public'));

        //Carga de archivos
        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/'
        }));
    }

    routes(){
        this.app.use(this.paths.authPath, require('../routes/auth'));
        this.app.use(this.paths.userPath, require('../routes/user'));
        this.app.use(this.paths.buscarPath, require('../routes/buscar'));
        this.app.use(this.paths.productoPath, require('../routes/productos'));
        this.app.use(this.paths.categoriasPath, require('../routes/categorias'));
        this.app.use(this.paths.uploadsPath, require('../routes/upload'));
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log(`Servidor escuchando en el puerto ${this.port}`);
        })       
    }

}

module.exports = Server;