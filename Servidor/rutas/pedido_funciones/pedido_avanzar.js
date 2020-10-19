const sequelize = require('../../database');

const pedido_avanzar = async function (req, res) {
    const nombre_usuario = req.params.nombre_usuario;
    const idPedido = req.query.id_pedido;

    let select = 'SELECT * FROM pedidos WHERE id_pedido = ?'
    await sequelize.query(select, {replacements:[idPedido], type: sequelize.QueryTypes.SELECT })
    .then(async (sql) => {
        if (sql[0] == '' || sql[0] == null){
            res.status(404).send('El pedido: ' + idPedido + ' no existe en la base de datos para el usuario: ' + nombre_usuario + '!');
        }else{
            switch (sql[0].estado){
                case "Nuevo":
                    nuevoEstado = 'Confirmado'
                    await avanzar_estado(nuevoEstado, idPedido, res)
                    break;
                case "Confirmado":
                    nuevoEstado = 'Preparando'
                    await avanzar_estado(nuevoEstado, idPedido, res)
                    break;
                case "Preparando":
                    nuevoEstado = 'Enviando'
                    await avanzar_estado(nuevoEstado, idPedido, res)
                    break;
                case "Enviando":
                    nuevoEstado = 'Entregado'
                    await avanzar_estado(nuevoEstado, idPedido, res)
                    break;
                case "Entregado":
                    res.status(404).send('El pedido: ' + idPedido + ' ya se encuentra entregado, no se puede avanzar.');
                    break;
                case "Cancelado":
                    res.status(404).send('El pedido: ' + idPedido + ' se encuentra cancelado, no se puede avanzar de estado.');
                    break;
                default:
                    res.status(404).send('El pedido: ' + idPedido + ' contiene un estado erroneo, por favor chequear estado del mismo!');
                    break;
            }
        }
    })
    .catch((err) => {
        respuesta = {error: "Ups! a ocurrido un error: " + err}
        res.status(500).send(respuesta);
    })
}

async function avanzar_estado(nuevoEstado, idPedido, res) {
    let update = 'UPDATE pedidos SET estado = ? WHERE id_pedido = ?'
    await sequelize.query(update, {replacements:[nuevoEstado, idPedido], type: sequelize.QueryTypes.UPDATE })
    .then((data)=>{
        if (data[1] == '0'){
            res.status(404).send('No se pudo avanzar de estado el pedido: ' + idPedido + ' !');
        }else{
            res.status(200).send('El pedido: '+ idPedido + ' avanzo al estado : ' + nuevoEstado );
        }
    })
    .catch((err) => {
        respuesta = {error: "Ups! a ocurrido un error: " + err}
        res.status(500).send(respuesta);
    })
}

module.exports = pedido_avanzar;