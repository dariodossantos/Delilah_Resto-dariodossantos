const express   = require('express');
const sequelize = require('../../database');

const pedido_confirmar  = function (req, res) {
    const nombre_usuario = req.params.nombre_usuario;
    let total = 0;
    let i=1;

    req.body.productos.forEach ( async dato => {    
        let select_producto = 'SELECT * FROM productos WHERE id_producto = ?'
        await sequelize.query(select_producto, {replacements:[dato.id_producto], type: sequelize.QueryTypes.SELECT })
        .then( async (data) => {  
            if (data[0] == '' || data[0] == null){
                respuesta = 'Algun producto seleccionado no existe.';
                Reject(respuesta);
            }else{
                let select_producto = 'SELECT * FROM productos WHERE id_producto = ? and disponibilidad >= ?'
                await sequelize.query(select_producto, {replacements:[dato.id_producto, dato.cantidad], type: sequelize.QueryTypes.SELECT })
                .then( (sql) => {
                    if (sql[0] == '' || sql[0] == null){
                        respuesta = 'No hay stock disponible para la cantidad solicitada en este producto: ' + data[0].menu + ', Cantidad: ' + dato.cantidad;
                        Reject(respuesta);
                    }else{
                        total = total + (sql[0].precio * dato.cantidad);
                        if ( i == req.body.productos.length) {
                            confirmar_pedido(nombre_usuario, total, req, res);
                        }else{
                            i=i+1;
                        }
                    }
                })
                .catch((err) => {
                    res.status(404).send(respuesta);
                });
            }
        })
       .catch((err) => {
            res.status(404).send(respuesta);
        });
    })
}

async function confirmar_pedido(nombre_usuario, total, req, res) {
    await actualizar_cantidad(req, res)
    .then( async ()=>{
        
        let select = 'SELECT * FROM usuarios WHERE nombre_usuario = ? OR mail = ?'
        await sequelize.query(select, {replacements:[nombre_usuario, nombre_usuario], type: sequelize.QueryTypes.SELECT })
        .then(async (sql) => {
            if (sql[0] == '' || sql[0] == null){
                res.status(404).send('El usuario: ' + nombre_usuario + ' no existe en la base!');
            }else{
                let insert_pedido = 'INSERT INTO pedidos (nombre_usuario, estado, total_pedido, forma_de_pago) values(?, ?, ?, ?)'
                await sequelize.query(insert_pedido, {replacements:[sql[0].nombre_usuario, 'Nuevo', total, req.body.forma_de_pago], type: sequelize.QueryTypes.INSERT })
                .then( (data) => {
                    detalle_pedido(data[0], req, res);
                })
                .catch((err) => {
                    respuesta = { error: "Ups! a ocurrido un error: " + err }
                    res.status(500).send(respuesta);
                });
            }
        })
    })
}

async function actualizar_cantidad(req, res) {
    req.body.productos.forEach ( async dato => {
        let insert_pedido = 'UPDATE productos SET disponibilidad = disponibilidad - ? WHERE id_producto = ?'
    
        await sequelize.query(insert_pedido, {replacements:[dato.cantidad, dato.id_producto], type: sequelize.QueryTypes.UPDATE })
        .then( () => { return true })
        .catch((err) => {
            console.log('10')
            respuesta = { error: "Ups! a ocurrido un error: " + err }
            res.status(500).send(respuesta);
        });
    })
}

async function detalle_pedido(idPedido, req, res) {
    let i=1;

    req.body.productos.forEach ( async dato => {   
        let insert_detalle_pedido = 'INSERT INTO pedidos_detalle (id_pedido, id_producto, cantidad) values(?, ?, ?)'

        await sequelize.query(insert_detalle_pedido, {replacements:[idPedido, dato.id_producto, dato.cantidad], type: sequelize.QueryTypes.INSERT })
        .then( (data) => {
            if ( i == req.body.productos.length) {
                res.status(201).send('Pedido Confirmado! su numero de pedido es: ' + JSON.stringify(idPedido))
            }else{
                i=i+1;
            } 
        })
        .catch((err) => {
            respuesta = { error: "Ups! a ocurrido un error: " + err }
            res.status(500).send(respuesta);
        });
    })
}

module.exports = pedido_confirmar;