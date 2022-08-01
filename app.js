require('dotenv').config();

//Imports
const express = require('express');
const app = express();

//Puerto
const port = process.env.PORT;

app.get('/', (req, resp) => {
    resp.send('Hola mundo!');
})

app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
})