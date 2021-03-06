// Importando el modelo product
const Product = require('../models/Product');

// Método create, para crear nuevo productos
exports.createProduct = (req, res) => {
    // Crear un producto
    const product = new Product({
        name: req.body.name,
        description: req.body.description,
        quantity: req.body.quantity,
        date: req.body.date
    })

    if(!product && product === null) {
        return res.status(404).json({
            status: 'error',
            message: 'No se puede guardar el producto vacio...'
        })
    }

    // Guardar en la base de datos
    product.save()
        .then(productData => {
            res.json({
                productData: productData
            });
        })
        .catch(error => {
            res.status(500).json({
                status: 'error',
                message: error.message || 'Ocurrio un error al tratar de guardar los datos.'
            })
        })
};

// Método para buscar todos los productos creados en la base de datos
exports.findAllProducts = (req, res) => {
    Product.find()
        .then(products => {
            res.json({
                products: products
            })
        })
        .catch(error => {
            res.status(500).json({
                status: 'error',
                message: message.error || 'No se encontraron productos...'
            })
        })
};

// Método para buscar un solo producto por medio de ID
exports.findOneProduct = (req, res) => {
    Product.findById(req.params.productId)
        .then(product => {
            if(!product) {
                return res.status(404).json({
                    status: 'error',
                    message: `No se encontro ningun producto con id: ${req.params.productId}`,
                    product: null
                })
            }

            return res.json({
                status: 'Ok',
                product: product
            })
        })
};

// Método para actualizar un producto por medio del ID
exports.updateProduct = (req, res) => {
    // Validando la petición
    if(!req.body) {
        return res.status(400).json({
            status: 'error',
            message: 'Los datos no pueden estar en blanco'
        })
    }

    // Buscar un producto por id
    Product.findByIdAndUpdate(req.params.productId, {
        name: req.body.name,
        description: req.body.description,
        quantity: req.body.quantity,
        data: req.body.date
    }, { new: true })
    .then(product => {
        if(!product) {
            return res.status(404).json({
                message: `No encontramos este producto con id: ${req.params.productId}`,
                product: null
            })
        } 

        res.status(200).json({
            product: product
        })
    })
};

// Método para eliminar un producto por medio de ID
exports.deleteProduct = (req, res) => {
    // Eliminar producto por ID
    Product.findOneAndDelete(req.params.productId)
        .then(product => {
            if(!product) {
                return res.status(404).json({
                    status: 'error',
                    message: `No se encontro ningun producto con id: ${req.params.productId}`,
                    product: null
                })
            }

            res.status(200).json({
                status: 'Ok',
                product: product
            })
        })
};