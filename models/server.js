const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/configDB');

class Server {
    
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.userPath = '/api/users';

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
    }

    routes(){
        this.app.use(this.userPath, require('../routes/user'));
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log(`Servidor escuchando en el puerto ${this.port}`);
        })       
    }

}

module.exports = Server;