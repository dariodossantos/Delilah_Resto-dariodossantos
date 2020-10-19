const sequelize = require('../../database');

const pedido_validar = async function (req, res, next) {

    await validar_formaDePago(req, res)
    .then( async () => { await validar_idProducto(req, res) })
    .then( async () => { await validar_cantidad(req, res) })
    .then( async () => { await validar_producto(req, res, next) })
    .catch(() => {
        res.status(404).send(respuesta);
        next('error');
    })

}

// FUNCION PARA VALIDAR FORMA DE PAGO //
async function validar_formaDePago(req, res) {
    let select = 'SELECT * FROM forma_de_pago WHERE id_forma_de_pago = ?'
    
    await sequelize.query(select, {replacements:[req.body.forma_de_pago], type: sequelize.QueryTypes.SELECT })
    .then((sql) => {
        if (sql[0] == '' || sql[0] == null){
            respuesta = 'La forma de pago no existe, por favor las formas de pago son: 1 (Para Efectivo), 2 (Para Tarjeta de Debito), 3 (Para Tarjeta de Credito)';
            Reject(respuesta);
        }
    })
}

// FUNCION PARA VALIDAR ID PRODUCTO //
function validar_idProducto(req, res) {
    req.body.productos.forEach ( dato => {
        if (!dato.id_producto || dato.id_producto == null || /^\s+|\s+$/.test(dato.id_producto)) {
            respuesta = 'El ID producto no puede ser ceros ni espacios';
            Reject(respuesta);
        }
    })
}

// FUNCION PARA VALIDAR CANTIDAD //
async function validar_cantidad(req, res) {
    req.body.productos.forEach( dato => {
        if (!dato.cantidad || dato.cantidad == null || /^\s+|\s+$/.test(dato.cantidad)) {
            respuesta = 'Ingrese una cantidad correcta, la misma no puede ser cero ni contener espacios.';
            Reject(respuesta);
        }else{
            if (/^(\d*([.,](?=\d{3}))?\d+)+((?!\2)[.,]\d\d)?$/.test(dato.cantidad)) {
                if (dato.cantidad < 1  || dato.cantidad > 999) {
                    respuesta = 'se permite un rango de 1 a 999';
                    Reject(respuesta);
                }
            }else{
                respuesta = 'Formato de campo disponibilidad incorrecto';
                Reject(respuesta);
            }
        }
    })
}

function validar_producto(req, res, next) {
    let i = 1
    req.body.productos.forEach ( async dato => {
        let select = 'SELECT * FROM productos WHERE id_producto = ?'
        await sequelize.query(select, {replacements:[dato.id_producto], type: sequelize.QueryTypes.SELECT })
        .then((menu) => {
            if (menu[0] == '' || menu[0] == null){
                respuesta = 'El producto no existe en la base de datos!';
                Reject(respuesta);
            }else{
                if ( i == req.body.productos.length) {
                    next();
                }else{
                    i=i+1;
                }
            }
        })
        .catch(() => {
            res.status(404).send(respuesta);
            next('error');
        })
    })
}

module.exports = pedido_validar;