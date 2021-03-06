// Importando mongoose
const mongoose = require('mongoose');
// Importando Schema desde mongoose
const { Schema } = mongoose;

// Creando modelo
const ProductSchema = new Schema({
    name: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    quantity: {
        type: Number,
        required: true
    },

    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Product', ProductSchema);