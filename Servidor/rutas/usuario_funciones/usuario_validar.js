const sequelize = require('../../database');

const usuario_validar  = async function (req, res, next) {
    const { nombre_usuario, nombre_apellido, mail, telefono, direccion, password } = req.body;

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
            if (usuario[0] != '' && usuario[0] != null){
                res.status(409).send('Usuario existente, por favor utilice otro nombre de usuario!');
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
    if (!nombre_apellido || nombre_apellido == null || /^\s+|\s+$/.test(nombre_apellido)) {
        res.status(400).send('Ingrese nombre y apellido por favor!');
        next('error');
    }
}

// FUNCION PARA VALIDAR MAIL //
async function validar_mail(mail, res, next) {
    if (!mail || mail == null || /^\s+|\s+$/.test(mail)) {
        res.status(400).send('Ingrese un mail por favor!');
        next('error');
    }else{
        if (/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(mail)) {
            let select = 'SELECT mail FROM usuarios WHERE mail = ?'
            await sequelize.query(select, {replacements:[mail], type: sequelize.QueryTypes.SELECT })
            .then((dato) => {
                if (dato[0] != '' && dato[0] != null){
                    res.status(409).send('Este mail ya existe, por favor utilice otro!');
                    next('error');
                }
            })
            .catch((err) => {
                respuesta = {error: "Ups! a ocurrido un error: " + err}
                res.status(500).send(respuesta);
                next('error');
            })
        }else{
            res.status(400).send('Ingrese un mail correcto por favor!');
            next('error');
        }

    }
}

// FUNCION PARA VALIDAR TELEFONO //
function validar_telefono(telefono, res, next) {
    if (!telefono || telefono == null || /^\s+|\s+$/.test(telefono)) {
        res.status(400).send('Ingrese un numero de telefono por favor!');
        next('error');
    }
}

// FUNCION PARA VALIDAR DIRECCION //
function validar_direccion(direccion, res, next) {
    if (!direccion || direccion == null || /^\s+|\s+$/.test(direccion)) {
        res.status(400).send('Ingrese una direccion por favor!');
        next('error');
    }
}

// FUNCION PARA VALIDAR password //
function validar_password(password, res, next) {
    if (!password || password == null || /^\s+|\s+$/.test(password)) {
        res.status(400).send('Ingrese una password por favor!');
        next('error');
    }
}

module.exports = usuario_validar;