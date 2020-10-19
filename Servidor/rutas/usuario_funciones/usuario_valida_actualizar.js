const sequelize = require('../../database');

const usuario_valida_actualizar  = async function (req, res, next) {
    const nombre_usuario = req.params.nombre_usuario;
    const { nombre_apellido, mail, telefono, direccion, password } = req.body;

    await validar_nombre_usuario(nombre_usuario, res, next)
    .then( async () => { await validar_nombre_apellido(nombre_apellido, res, next) })
    .then( async () => { await validar_mail(mail, res, next) })
    .then( async () => { await validar_telefono(telefono, res, next) })
    .then( async () => { await validar_direccion(direccion, res, next) })
    .then( async () => { await validar_password(password, res, next) })
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
        let select = 'SELECT nombre_usuario FROM usuarios WHERE nombre_usuario = ?'
        await sequelize.query(select, {replacements:[nombre_usuario], type: sequelize.QueryTypes.SELECT })
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

// FUNCION PARA VALIDAR NOMBRE y APELLIDO //
function validar_nombre_apellido(nombre_apellido, res, next) {
    if (/^\s+|\s+$/.test(nombre_apellido)) {
        res.status(400).send('Ingrese un nombre y apellido correcto o verifique que el campo no tenga espacios.');
        next('error');
    }
}

// FUNCION PARA VALIDAR MAIL //
async function validar_mail(mail, res, next) {
    if (/^\s+|\s+$/.test(mail)) {
        res.status(400).send('Ingrese un mail correcto o verifique que el campo no tenga espacios.');
        next('error');
    }else{
        if (mail != '') {
            let val_mail = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(mail)
            if (!val_mail) {
                res.status(400).send('Ingrese un mail correcto por favor!');
                next('error');
            }            
        }
    }
}

// FUNCION PARA VALIDAR TELEFONO //
function validar_telefono(telefono, res, next) {
    if (/^\s+|\s+$/.test(telefono)) {
        res.status(400).send('Ingrese un numero de telefono correcto o verifique que el campo no tenga espacios.');
        next('error');
    }
}

// FUNCION PARA VALIDAR DIRECCION //
function validar_direccion(direccion, res, next) {
    if (/^\s+|\s+$/.test(direccion)) {
        res.status(400).send('Ingrese una direccion correcta o verifique que el campo no tenga espacios.');
        next('error');
    }
}

// FUNCION PARA VALIDAR password //
function validar_password(password, res, next) {
    if (/^\s+|\s+$/.test(password)) {
        res.status(400).send('Ingrese una password correcta o verifique que el campo no tenga espacios.');
        next('error');
    }
}

module.exports = usuario_valida_actualizar;