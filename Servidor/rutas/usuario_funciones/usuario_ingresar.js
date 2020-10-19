const jwt       = require('jsonwebtoken');
const bcrypt    = require('bcryptjs');
const sequelize = require('../../database');

const usuario_ingresar  = async function (req, res) {
    const { nombre_usuario, password } = req.body;
    let select = 'SELECT password FROM usuarios WHERE nombre_usuario = ? OR mail = ?'

    await sequelize.query(select, {replacements:[nombre_usuario, nombre_usuario], type: sequelize.QueryTypes.SELECT })
    .then( async(password_bd) => {
        if (password_bd[0] == '' || password_bd[0] == null){
            res.status(400).send('Usuario/Password invalidos');
        }else{
            let res_pass = await bcrypt.compare(String(password), String(password_bd[0].password));

            if (res_pass) {
                let select = 'SELECT * FROM usuarios WHERE (nombre_usuario = ? OR mail = ?) AND password = ?'

                await sequelize.query(select, {replacements:[nombre_usuario, nombre_usuario, password_bd[0].password], type: sequelize.QueryTypes.SELECT })
                .then((usuario) => {
                    if (usuario[0]) {
                        const token = jwt.sign({'user': usuario[0].nombre_usuario, 'rol': usuario[0].rol}, process.env.FIRMA, {expiresIn: 60 * 60 * 24}, { algorithm: 'RS256' });
                        respuesta = {Token: token}
                        res.status(200).send(respuesta);  
                    }else{
                        res.status(400).send('Usuario/Password invalidos');
                    }
                })
                .catch((err) => {
                    respuesta = {error: "Ups! a ocurrido un error: " + err}
                    res.status(500).send(respuesta);
                });
            } else {
                res.status(400).send('Usuario/Password invalidos');
            }          
        }
    })
    .catch((err) => {
        respuesta = {error: "Ups! a ocurrido un error: " + err}
        res.status(500).send(respuesta);
    });
}

module.exports = usuario_ingresar;