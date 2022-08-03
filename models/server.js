const express = require('express');

class Server {
    
    constructor(){
        this.app = express();
        this.port = process.env.PORT;

        //Middlewares
        this.middlewares();

        //Rutas
        this.routes();
    }

    middlewares(){
        this.app.use(express.static('public'));
    }

    routes(){
        this.app.get('/api', (req, resp) => {
            resp.json({
                msg:'get API'
            });
        })

        this.app.put('/api', (req, resp) => {
            resp.json({
                msg:'put API'
            });
        })

        this.app.post('/api', (req, resp) => {
            resp.json({
                msg:'post API'
            });
        })

        this.app.delete('/api', (req, resp) => {
            resp.json({
                msg:'delete API'
            });
        })

        this.app.patch('/api', (req, resp) => {
            resp.json({
                msg:'patch API'
            });
        })
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log(`Servidor escuchando en el puerto ${this.port}`);
        })       
    }

}

module.exports = Server;