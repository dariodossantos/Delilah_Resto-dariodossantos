const bcrypt    = require('bcryptjs');
const sequelize = require('../../database');

const usuario_crear  = async function (req, res) {
    const { nombre_usuario, nombre_apellido, mail, telefono, direccion, password } = req.body;

    let salt = await bcrypt.genSalt(10);
    let passEncrypt = await bcrypt.hash(password, salt)
    let insert = 'INSERT INTO usuarios (nombre_usuario, nombre_apellido, mail, telefono, direccion, password, rol) values(?, ?, ?, ?, ?, ?, ?)'

    await sequelize.query(insert, {replacements:[nombre_usuario, nombre_apellido, mail, telefono, direccion, passEncrypt, 'usuario'], type: sequelize.QueryTypes.INSERT })
    .then( (data) => { res.status(201).send('Usuario creado correctamente!') })
    .catch((err) => {
        respuesta = { error: "Ups! a ocurrido un error aca: " + err }
        res.status(500).send(respuesta);
    });
}

module.exports = usuario_crear;