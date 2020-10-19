const bcrypt    = require('bcryptjs');
const sequelize = require('../../database');

const usuario_actualizar = async function (req, res) {
    const nombre_usuario = req.params.nombre_usuario;
    const { nombre_apellido, mail, telefono, direccion, password } = req.body;

    let password_db = '';
    if (password != '') {
        let salt = await bcrypt.genSalt(10);
        password_db = await bcrypt.hash(password, salt)
    }

    let select = 'SELECT * FROM usuarios WHERE nombre_usuario = ?  OR mail = ?'
    await sequelize.query(select, {replacements:[nombre_usuario, nombre_usuario], type: sequelize.QueryTypes.SELECT })
    .then((usuario) => {
        if (usuario[0] == '' && usuario[0] == null){
            res.status(400).send('Usuario no existe, por favor intente de nuevo!');
            next('err');
        }else{
            if (nombre_apellido != '') { nombre_apellido_db = nombre_apellido }else{ nombre_apellido_db = usuario[0].nombre_apellido }
            if (mail != '') { mail_db = mail }else{ mail_db = usuario[0].mail }
            if (telefono != '') { telefono_db = telefono }else{ telefono_db = usuario[0].telefono }
            if (direccion != '') { direccion_db = direccion }else{ direccion_db = usuario[0].direccion }
            if (password == '') { password_db = usuario[0].password }

            actualizar(nombre_apellido_db, mail_db, telefono_db, direccion_db, password_db, nombre_usuario, res);
        }
    })
    .catch((err) => {
        respuesta = {error: "Ups! a ocurrido un error: " + err}
        res.status(500).send(respuesta);
        next('err');
    })
}

async function actualizar(nombre_apellido_db, mail_db, telefono_db, direccion_db, password_db, nombre_usuario, res)  {
    let update = 'UPDATE usuarios SET nombre_apellido=?, mail=?, telefono=?, direccion=?, password=? WHERE nombre_usuario = ? OR mail = ?'
    await sequelize.query(update, {replacements:[nombre_apellido_db, mail_db, telefono_db, direccion_db, password_db, nombre_usuario, nombre_usuario], type: sequelize.QueryTypes.UPDATE })
    .then( (data) => {
        res.status(200).send('Usuario actualizado correctamente')
    })
    .catch((err) => {
        respuesta = { error: "Ups! a ocurrido un error aca: " + err }
        res.status(500).send(respuesta);
    });
}


module.exports = usuario_actualizar;




