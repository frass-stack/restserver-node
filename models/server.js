const express = require('express');
const cors = require('cors');

class Server {
    
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.userPath = '/api/users';

        //Middlewares
        this.middlewares();

        //Rutas
        this.routes();
    }

    middlewares(){

        this.app.use(cors());

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