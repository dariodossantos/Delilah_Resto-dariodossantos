const sequelize = require('../../database');

const producto_eliminar  = async function (req, res) {
    const { id_producto } =  req.query;

    let select = 'SELECT * FROM productos WHERE id_producto = ?'

    await sequelize.query(select, {replacements:[id_producto], type: sequelize.QueryTypes.SELECT })
    .then( async(data) => {
        if (data[0] == '' || data[0] == null){
            res.status(404).send('Producto inexistente, por favor intente de nuevo!');
        }else{
            let eliminar = 'DELETE FROM productos WHERE id_producto = ?'

            await sequelize.query(eliminar, {replacements:[id_producto], type: sequelize.QueryTypes.DELETE })
            .then(() => {
                    res.status(200).send('Producto eliminado correctamente!');
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

module.exports = producto_eliminar;