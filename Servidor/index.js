const cors       = require('cors');
const express    = require('express');
const expressJwt = require('express-jwt');
const rateLimit  = require("express-rate-limit");
const helmet     = require('helmet');
const bodyParser = require('body-parser');
const morgan     = require('morgan');
const path       = require('path');
const dotenv     = require('dotenv').config();

const app        = express();

const checkLimit = rateLimit({
    windowMs: 5 * 60 * 1000,
    max: 50,
    message: "Se supero el limite de accesos al servidor (5min - 50 accesos)!"
});


// Middlewares //
app.use(helmet());
app.disable('x-powered-by');
app.use(bodyParser.json({ limit: '100kb' }));
app.use(checkLimit);
app.use(expressJwt({ secret: process.env.FIRMA, algorithms: ['HS256'] }).unless({ path: ["/usuario/ingresar", "/usuario/crear"]  }));
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Rutas //
const usuario = require('./rutas/usuario')
app.use('/usuario', usuario);

const producto = require('./rutas/producto')
app.use('/producto', producto);

const pedido = require('./rutas/pedido')
app.use('/pedidos', pedido);

// Arrancar servidor //
app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo en puerto:', process.env.PORT)
});