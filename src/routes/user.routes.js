// Importando express
const express = require('express');
// Importando express router
const router = express.Router();

// Importando los controladores para registro
const userControllers = require('../controllers/userController');

// Definiendo las rutas
router.get('/', userControllers.home);
router.post('/signUp', userControllers.register);
router.post('/signIn', userControllers.login);

// Exportando las rutas
module.exports = router;