const express   = require('express');
const sequelize = require('../../database');

const producto_actualizar  = async function (req, res) {
    const { id_producto } =  req.query;
    const { menu, precio, disponibilidad } =  req.body;

    let select = 'SELECT * FROM productos WHERE id_producto = ?'
    await sequelize.query(select, {replacements:[id_producto], type: sequelize.QueryTypes.SELECT })
    .then((producto) => {
        if (producto[0] == '' && producto[0] == null){
            res.status(400).send('producto no existe, por favor intente de nuevo!');
        }else{
            if (menu != '') {menu_db = menu }else{ menu_db = producto[0].menu }
            if (precio > 0 && precio != undefined) { precio_db = precio }else{ precio_db = producto[0].precio }
            if (disponibilidad > 0 && disponibilidad!= undefined) { disponibilidad_db = disponibilidad }else{ disponibilidad_db = producto[0].disponibilidad }

            actualizar(menu_db, precio_db, disponibilidad_db, id_producto, res);
        }
    })
    .catch((err) => {
        respuesta = {error: "Ups! a ocurrido un error: " + err}
        res.status(500).send(respuesta);
    })
}

async function actualizar(menu_db, precio_db, disponibilidad_db, id_producto, res)  {
    let update = 'UPDATE productos SET menu=?, precio=?, disponibilidad=? WHERE id_producto=?'

    await sequelize.query(update, {replacements:[menu_db.toUpperCase(), precio_db, disponibilidad_db, id_producto], type: sequelize.QueryTypes.UPDATE })
    .then( (data) => {
        res.status(201).send('Producto actualizado correctamente');
    })
    .catch((err) => {
        respuesta = { error: "Ups! a ocurrido un error aca: " + err }
        res.status(500).send(respuesta);
    });
}

module.exports = producto_actualizar;


