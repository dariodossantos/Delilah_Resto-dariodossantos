const express = require('express');
const router  = express.Router();

const usuario_ingresar = require('./usuario_funciones/usuario_ingresar');
router.post('/ingresar', usuario_ingresar);

const usuario_validar = require('./usuario_funciones/usuario_validar');
const usuario_crear = require('./usuario_funciones/usuario_crear');
router.post('/crear', usuario_validar, usuario_crear);

const valida_token_user = require('./valida_token_user');
const usuario_consultar = require('./usuario_funciones/usuario_consultar');
router.get('/consultar/:nombre_usuario', valida_token_user, usuario_consultar);

const usuario_valida_actualizar = require('./usuario_funciones/usuario_valida_actualizar');
const usuario_actualizar = require('./usuario_funciones/usuario_actualizar');
router.put('/actualizar/:nombre_usuario', valida_token_user, usuario_valida_actualizar, usuario_actualizar);

const usuario_eliminar = require('./usuario_funciones/usuario_eliminar');
router.delete('/eliminar/:nombre_usuario', valida_token_user, usuario_eliminar);

module.exports = router;