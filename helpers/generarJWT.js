const jwt = require('jsonwebtoken');

const generarJWT = ( uid = '' ) => {

    return new Promise( (response, reject) => {

        const payload = { uid }

        jwt.sign( payload, process.env.SECRETORPRIVATEKEY, {
            expiresIn:'4h'
        }, ( err, token ) => {
            if( err ){
                console.log(err);
                reject('No se pudo generar el token.');
            }else{
                response( token )
            }
        })
    })
}

module.exports = {
    generarJWT
}