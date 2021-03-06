// Importamos el módulo express
const express = require('express');
// Importando body parser
const bodyParser = require('body-parser');
// Módulo dotenv
require('dotenv').config();
//Importando cors
const cors = require('cors');
// Importando base de datos
const mongoose = require('./config/database');
// Importando middleware para validar el token del usuario
const verifyTokenUser = require('./middlewares/validate_token');

// Importando las rutas de productos
const products = require('./routes/product.routes');
// Importando las rutas de usuarios
const users = require('./routes/user.routes');
// Importando ruta home
const dashboard = require('./routes/user.routes');

// Guardamos en una constante app la función express
const app = express();

// Puerto de la aplicación
const port = process.env.PORT || 8000;

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Middleware cors
app.use(cors());

// Rutas protegidas
app.use('/dashboard', verifyTokenUser, dashboard)
app.use('/products', verifyTokenUser, products)
// Rutas publicas
app.use('/users', users);



// Creamos el puerto en el que correra el servidor
app.listen(port, () => console.log(`Servidor corriendo en: http://localhost:${port}`));