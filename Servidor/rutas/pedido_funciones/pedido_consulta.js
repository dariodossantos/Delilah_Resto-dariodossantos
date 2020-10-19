const sequelize = require('../../database');

const pedido_consulta = async function (req, res) {
    const nombre_usuario = req.params.nombre_usuario;

    let select = 'SELECT * FROM pedidos  a INNER JOIN forma_de_pago b on (a.forma_de_pago = b.id_forma_de_pago) WHERE a.nombre_usuario IN (SELECT nombre_usuario FROM usuarios WHERE nombre_usuario = ? OR mail = ?) ORDER BY a.fecha_alta desc'
    await sequelize.query(select, {replacements:[nombre_usuario, nombre_usuario], type: sequelize.QueryTypes.SELECT })
    .then((sql) => {
        if (sql[0] == '' || sql[0] == null){
            res.status(404).send('El usuario: ' + nombre_usuario + ' no tiene pedidos!');
        }else{
            let i=0;
            let consulta = [];

            sql.forEach ( async dato => {
                respuesta = {
                    "id_pedido": sql[i].id_pedido,
                    "estado": sql[i].estado,
                    "total": sql[i].total_pedido,
                    "Forma de Pago": sql[i].descripcion,
                    "fecha Pedido": sql[i].fecha_alta
                }
                consulta.push(respuesta);
                i=i+1;
            })
            res.status(200).send(consulta);
        }
    })
    .catch((err) => {
        respuesta = {error: "Ups! a ocurrido un error: " + err}
        res.status(500).send(respuesta);
    })
}

module.exports = pedido_consulta;