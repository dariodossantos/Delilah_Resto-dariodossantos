const express   = require('express');
const sequelize = require('../../database');

const producto_listar  = async function (req, res) {
    let select = 'SELECT * FROM productos WHERE disponibilidad > ?'

    await sequelize.query(select, {replacements:[0], type: sequelize.QueryTypes.SELECT })
    .then( (data) => {
        res.status(200).send(data);
    })
    .catch((err) => {
        respuesta = { error: "Ups! a ocurrido un error aca: " + err }
        res.status(500).send(respuesta);
    });
}

module.exports = producto_listar;