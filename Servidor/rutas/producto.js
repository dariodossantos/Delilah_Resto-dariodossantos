const express = require('express');
const router  = express.Router();

const valido_token_admin = require('./valido_token_admin');
const producto_validar = require('./producto_funciones/producto_validar');
const producto_crear = require('./producto_funciones/producto_crear');
router.post('/crear/:nombre_usuario', valido_token_admin, producto_validar, producto_crear);

const valida_token_user = require('./valida_token_user');
const producto_listar = require('./producto_funciones/producto_listar');
router.get('/listar/:nombre_usuario', valida_token_user, producto_listar);

const producto_valida_actualizar = require('./producto_funciones/producto_valida_actualizar');
const producto_actualizar = require('./producto_funciones/producto_actualizar');
router.put('/actualizar/:nombre_usuario', valido_token_admin, producto_valida_actualizar, producto_actualizar);

const producto_eliminar = require('./producto_funciones/producto_eliminar');
router.delete('/eliminar/:nombre_usuario', valido_token_admin, producto_eliminar);

module.exports = router;