const express = require('express');
const router  = express.Router();

const valida_token_user = require('./valida_token_user');
const pedido_validar = require('./pedido_funciones/pedido_validar');
const pedido_confirmar = require('./pedido_funciones/pedido_confirmar');
router.post('/confirmar/:nombre_usuario', valida_token_user, pedido_validar, pedido_confirmar)

const pedido_seguir = require('./pedido_funciones/pedido_seguir');
router.get('/seguir/:nombre_usuario', valida_token_user, pedido_seguir)

const pedido_consulta = require('./pedido_funciones/pedido_consulta');
router.get('/consulta/:nombre_usuario', valida_token_user, pedido_consulta)

const valido_token_admin = require('./valido_token_admin');
const pedido_cancelar = require('./pedido_funciones/pedido_cancelar');
router.put('/cancelar/:nombre_usuario', valido_token_admin, pedido_cancelar)

const pedido_avanzar = require('./pedido_funciones/pedido_avanzar');
router.put('/avanzar/:nombre_usuario', valido_token_admin, pedido_avanzar)

module.exports = router;