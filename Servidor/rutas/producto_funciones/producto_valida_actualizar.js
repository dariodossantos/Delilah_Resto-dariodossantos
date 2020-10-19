const sequelize = require('../../database');

const producto_valida_actualizar  = async function (req, res, next) {
    const nombre_usuario = req.params.nombre_usuario;
    const { id_producto } =  req.query;
    const { menu, precio, disponibilidad } =  req.body;

    await validar_nombre_usuario(nombre_usuario, res, next)
    .then( async () => { await validar_idProducto(id_producto, res, next) })
    .then( async () => { await validar_menu(menu, res, next) })
    .then( async () => { await validar_precio(precio, res, next) })
    .then( async () => { await validar_disponibilidad(disponibilidad, res, next) })
    .catch((err) => {
        respuesta = { error: "Ups! a ocurrido un error: " + err }
        res.status(500).send(respuesta);
        next('error');
    });

    next();
}

// FUNCION PARA VALIDAR NOMBRE DE USUARIO //
async function validar_nombre_usuario(nombre_usuario, res, next) {
    if (!nombre_usuario || nombre_usuario == null || /^\s+|\s+$/.test(nombre_usuario)) {
        res.status(400).send('Ingrese nombre de usuario por favor!')
        next('error');
    }else{
        let select = 'SELECT nombre_usuario FROM usuarios WHERE nombre_usuario = ? OR mail = ?'
        await sequelize.query(select, {replacements:[nombre_usuario, nombre_usuario], type: sequelize.QueryTypes.SELECT })
        .then((usuario) => {
            if (usuario[0] == '' && usuario[0] == null){
                res.status(400).send('Usuario no existe, por favor intente de nuevo!');
                next('err');
            }
        })
        .catch((err) => {
            respuesta = {error: "Ups! a ocurrido un error: " + err}
            res.status(500).send(respuesta);
            next('err');
        })
    }
}

// FUNCION PARA VALIDAR ID PRODUCTO //
async function validar_idProducto(id_producto, res, next) {
    if (!id_producto || id_producto == null || /^\s+|\s+$/.test(id_producto)) {
        res.status(400).send('Ingrese el Id del Producto por favor!')
        next('error');
    }else{
        let select = 'SELECT * FROM productos WHERE id_producto = ?'
        await sequelize.query(select, {replacements:[id_producto], type: sequelize.QueryTypes.SELECT })
        .then((id) => {
            if (id[0] == '' || id[0] == null){
                res.status(400).send('Id de Producto no existe, por favor intente de nuevo!');
                next('err');
            }
        })
        .catch((err) => {
            respuesta = {error: "Ups! a ocurrido un error: " + err}
            res.status(500).send(respuesta);
            next('err');
        })
    }
}

// FUNCION PARA VALIDAR MENU //
async function validar_menu(menu, res, next) {
    if (/^\s+|\s+$/.test(menu)) {
        res.status(400).send('Ingrese un menu por favor o verifique el campo no tenga espacios!')
        next('error');
    }
}

// FUNCION PARA VALIDAR PRECIO //
function validar_precio(precio, res, next) {
    if (/^\s+|\s+$/.test(precio)) {
        res.status(400).send('Ingrese un precio correcto o verifique que el campo no tenga espacios.');
        next('error');
    }else{
        if ( precio != 0 && precio != null && precio != undefined) {
            if (/^(?!0+\.00)(?=.{1,9}(\.|$))(?!0(?!\.))\d{1,3}(,\d{3})*(\.\d+)?$/.test(precio)) {
                if (precio < 0) {
                    res.status(400).send('precio incorrecto no puede ser negativo');
                    next('error');
                }
            }else{
                res.status(400).send('Formato de precio incorrecto o el precio no puede ser cero/negativo');
                next('error');
            } 
        }
    }
}

// FUNCION PARA VALIDAR DISPONIBILIDAD //
function validar_disponibilidad(disponibilidad, res, next) {
    if (/^\s+|\s+$/.test(disponibilidad)) {
        res.status(400).send('Ingrese una cantidad correcta o verifique que el campo no tenga espacios.');
        next('error');
    }else{
        if (disponibilidad != 0 && disponibilidad != null && disponibilidad != undefined) {
            if (/^(\d*([.,](?=\d{3}))?\d+)+((?!\2)[.,]\d\d)?$/.test(disponibilidad)) {
                if (disponibilidad < 0  || disponibilidad > 999) {
                    res.status(400).send('se permite un rango de 0 a 999');
                    next('error');
                }
            }else{
                res.status(400).send('Formato de campo disponibilidad incorrecto o numero negativo');
                next('error');
            }
        }
    }
}

module.exports = producto_valida_actualizar;