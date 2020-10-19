const express   = require('express');
const sequelize = require('../../database');

const producto_crear  = async function (req, res) {
    const { menu, precio, disponibilidad } =  req.body;

    let insert = 'INSERT INTO productos (menu, precio, disponibilidad) values(?, ?, ?)'

    await sequelize.query(insert, {replacements:[menu.toUpperCase(), precio, disponibilidad], type: sequelize.QueryTypes.INSERT })
    .then( (data) => { res.status(201).send('Producto creado correctamente!') })
    .catch((err) => {
        respuesta = { error: "Ups! a ocurrido un error aca: " + err }
        res.status(500).send(respuesta);
    });
}

module.exports = producto_crear;