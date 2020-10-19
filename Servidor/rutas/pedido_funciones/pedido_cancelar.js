const sequelize = require('../../database');

const pedido_cancelar = async function (req, res) {
    const nombre_usuario = req.params.nombre_usuario;
    const idPedido = req.query.id_pedido;

    let select = 'SELECT * FROM pedidos WHERE id_pedido = ? AND estado = ?'
    await sequelize.query(select, {replacements:[idPedido, 'Cancelado'], type: sequelize.QueryTypes.SELECT })
    .then(async (sql) => {
        console.log(sql)
        if (sql[0] == '' || sql[0] == null){
            let update = 'UPDATE pedidos SET estado = ? WHERE id_pedido = ?'
            await sequelize.query(update, {replacements:['Cancelado', idPedido], type: sequelize.QueryTypes.UPDATE })
            .then((sql)=>{
                if (sql[1] == '0'){
                    res.status(404).send('El pedido: ' + idPedido + ' no pudo ser cancelado, es probable que ya no exista');
                }else{
                    res.status(200).send('Pedido: ' + idPedido + ' cancelado.' );
                }
            })
            .catch((err) => {
                respuesta = {error: "Ups! a ocurrido un error: " + err}
                res.status(500).send(respuesta);
            })
        }else{
            res.status(404).send('El pedido: ' + idPedido + ' ya se encuentra Cancelado, o no existe en la base de datos!');
        }
    })
    .catch((err) => {
        respuesta = {error: "Ups! a ocurrido un error: " + err}
        res.status(500).send(respuesta);
    })
}

module.exports = pedido_cancelar;