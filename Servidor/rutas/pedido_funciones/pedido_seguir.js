const sequelize = require('../../database');

const pedido_seguir = async function (req, res) {
    const nombre_usuario = req.params.nombre_usuario;
    const idPedido = req.query.id_pedido;

    let select = 'SELECT * FROM pedidos a INNER JOIN `pedidos_detalle` b ON (a.id_pedido = b.id_pedido) INNER JOIN `productos` c ON (b.id_producto = c.id_producto) INNER JOIN `forma_de_pago` d ON (a.forma_de_pago = d.id_forma_de_pago) WHERE a.id_pedido = ? AND a.nombre_usuario IN (SELECT nombre_usuario FROM usuarios WHERE nombre_usuario = ? OR mail = ?)'
    await sequelize.query(select, {replacements:[idPedido, nombre_usuario, nombre_usuario], type: sequelize.QueryTypes.SELECT })
    .then((sql)=>{
        if (sql[0] == '' || sql[0] == null){
            res.status(404).send('El pedido: ' + idPedido + ' no existe en la base de datos para el usuario: ' + nombre_usuario + '!');
        }else{
            let i=0;
            let consulta = [];

            sql.forEach ( dato => {
                productos = {
                    "Cantidad solicitada": dato.cantidad,
                    "Menu": dato.menu,
                    "Precio Unitario": dato.precio
                }
                consulta.push(productos)
                i=i+1;
            })
            respuesta = {
                "id_pedido": sql[0].id_pedido,
                "estado": sql[0].estado,
                "total": sql[0].total_pedido,
                "Forma de Pago": sql[0].descripcion,
                "fecha Pedido": sql[0].fecha_alta,
                "Productos": consulta
            }
            res.status(200).send(respuesta);
        }
    })
    .catch((err) => {
        respuesta = {error: "Ups! a ocurrido un error: " + err}
        res.status(500).send(respuesta);
    })
}

module.exports = pedido_seguir;