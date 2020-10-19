const jwt       = require('jsonwebtoken');
const sequelize = require('../database');

const valido_admin = async function (req, res, next) {
    const nombre_usuario = req.params.nombre_usuario;
    const barerHeader    = req.headers.authorization

    let select = 'SELECT * FROM usuarios WHERE (nombre_usuario = ? OR mail = ?)'
    await sequelize.query(select, {replacements:[nombre_usuario, nombre_usuario], type: sequelize.QueryTypes.SELECT })
    .then((sql) => {
        if (sql[0] == '' || sql[0] == null) {
            res.status(404).send('Usuario diferente al del token, por favor verifique!');
        }else{
            if(typeof barerHeader != 'undefined'){
                const bearer = barerHeader.split(' ');
                const bearerToken = bearer[1];
                req.token = bearerToken;
            }else{
                res.sendStatus(403).send('Peticion no autorizada'); 
                next('error');
            }
        
            jwt.verify(req.token, process.env.FIRMA, (err, data) => {
                if (err){ 
                    res.status(403).send('Certificado erroneo!'); 
                    next('error');
                }else{
                    if(sql[0].nombre_usuario != data.user) {
                        res.status(403).send('Usuario diferente al del token, por favor verifique!'); 
                        next('error');
                    }else{
                        if (data.rol == 'usuario') {
                            res.status(403).send('Peticion no autorizada'); 
                            next('error');   
                        }
                    }
                }
            })
        
            next();
        }
    })
    .catch((err) => {
        respuesta = {error: "Ups! a ocurrido un error: " + err}
        res.status(500).send(respuesta);
    });
}

module.exports = valido_admin;