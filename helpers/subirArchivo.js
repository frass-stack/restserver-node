const { v4:uuid } = require('uuid');
const path = require('path');

const subirArchivo = (files, extensionesValidas = ['png', 'jpg', 'jpeg', 'gif'], carpeta = '') => {

    return new Promise((resolve, reject) => {

        if(!files){
            return reject(`File no puede estar vacio. Por favor elija una img/archivo para cargar.`)            
        }

        //console.log('files >>>', files); // eslint-disable-line
    
        const { archivo } = files;
    
        //Validamos la extension
        const nombreCortado = archivo.name.split('.');
        const extension = nombreCortado[nombreCortado.length - 1];
        if (!extensionesValidas.includes(extension)) {
            return reject(`La extension ${extension}, no esta permitida. Las siguientes extensiones son validas: ${extensionesValidas}.`)
        } 
    
        //Ubicar y cambiar nombre
        const nombreTemp = uuid() + `.${extension}`
        const uploadPath = path.join(__dirname, '../uploads/', carpeta, nombreTemp);
    
        archivo.mv(uploadPath, (err) => {
            if (err) {
                reject(err);
            }
    
            resolve(nombreTemp)
        });
    })
}

module.exports = {
    subirArchivo
}