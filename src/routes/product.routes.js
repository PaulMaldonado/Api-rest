// Importando express
const express = require('express');
// Creando la constante router
const router = express.Router();

// Importando los controladores
const productControllers = require('../controllers/productController');

// Definiendo las rutas
router.post('/create', productControllers.createProduct);
router.get('/findAll', productControllers.findAllProducts);
router.get('/findId/:productId', productControllers.findOneProduct);
router.put('/updateId/:productId', productControllers.updateProduct);
router.delete('/deleteId/:productId', productControllers.deleteProduct);

// Exportando las rutas
module.exports = router;