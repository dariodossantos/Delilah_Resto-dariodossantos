const sequelize = require('../../database');

const usuario_eliminar  = async function (req, res) {
    const nombre_usuario = req.params.nombre_usuario;

    let select = 'SELECT * FROM usuarios WHERE nombre_usuario = ? OR mail = ?'

    await sequelize.query(select, {replacements:[nombre_usuario, nombre_usuario], type: sequelize.QueryTypes.SELECT })
    .then( async(data) => {
        if (data[0] == '' || data[0] == null){
            res.status(400).send('Usuario invalido');
        }else{
            let eliminar = 'DELETE FROM usuarios WHERE nombre_usuario = ? OR mail = ?'

            await sequelize.query(eliminar, {replacements:[nombre_usuario, nombre_usuario], type: sequelize.QueryTypes.DELETE })
            .then(() => {
                res.status(200).send('Usuario eliminado correctamente!');
            })
            .catch((err) => {
                respuesta = {error: 'Ups! a ocurrido un error: ' + err}
                res.status(500).send(respuesta);
            });
        }
    })
    .catch((err) => {
        respuesta = {error: 'Ups! a ocurrido un error: ' + err}
        res.status(500).send(respuesta);
    });
}

module.exports = usuario_eliminar;