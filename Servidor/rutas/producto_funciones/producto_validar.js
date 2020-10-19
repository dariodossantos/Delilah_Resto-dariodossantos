const sequelize = require('../../database');

const producto_validar = async function (req, res, next) {
    const { menu, precio, disponibilidad } =  req.body;

    await validar_menu(menu, res)
    .then( async () => { await validar_precio(precio, res) })
    .then( async () => { await validar_disponibilidad(disponibilidad, res) })
    .catch((err) => {
        res.status(500).send(respuesta);
    })

     next();
}

// FUNCION PARA VALIDAR MENU //
async function validar_menu(menu, res, next) {
    if (!menu || menu == null || /^\s+|\s+$/.test(menu)) {
        res.status(400).send('Ingrese un menu por favor o verifique el campo no tenga espacios!')
        next('error');
    }else{
        let select = 'SELECT menu FROM productos WHERE menu = ?'
        await sequelize.query(select, {replacements:[menu.toUpperCase()], type: sequelize.QueryTypes.SELECT })
        .then((menu) => {
            if (menu[0] != '' && menu[0] != null){
                res.status(400).send('El menu ya existe en la base de datos!');
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

// FUNCION PARA VALIDAR PRECIO //
function validar_precio(precio, res, next) {
    if (!precio || precio == null || /^\s+|\s+$/.test(precio)) {
        res.status(400).send('Ingrese un precio correcto o verifique que el campo no tenga espacios.');
        next('error');
    }else{
        if (/^(?!0+\.00)(?=.{1,9}(\.|$))(?!0(?!\.))\d{1,3}(,\d{3})*(\.\d+)?$/.test(precio)) {
            if (precio <= 0) {
                res.status(400).send('El precio no puede ser cero/negativo');
                next('error');
            }
        }else{
            res.status(400).send('Formato de precio incorrecto o el precio no puede ser cero/negativo');
            next('error');
        }
    }
}

// FUNCION PARA VALIDAR DISPONIBILIDAD //
function validar_disponibilidad(disponibilidad, res, next) {
    if (!disponibilidad || disponibilidad == null || /^\s+|\s+$/.test(disponibilidad)) {
        res.status(400).send('Ingrese una cantidad correcta o verifique que el campo no tenga espacios.');
        next('error');
    }else{
        if (/^(\d*([.,](?=\d{3}))?\d+)+((?!\2)[.,]\d\d)?$/.test(disponibilidad)) {
            if (disponibilidad < 0  || disponibilidad > 999) {
                res.status(400).send('se permite un rango de 0 a 999');
                next('error');
            }
        }else{
            res.status(400).send('Formato de campo disponibilidad incorrecto');
            next('error');
        }
    }
}

module.exports = producto_validar;