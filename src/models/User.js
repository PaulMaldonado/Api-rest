// Importando mongoose
const mongoose = require('mongoose');
// Importando Schema
const { Schema } = mongoose;

// Definiendo el schema para los usuarios
const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },

    email: {
        type: String,
        required: true,
        min: 6,
        max: 1024
    },

    password: {
        type: String,
        required: true,
        minLength: 6
    },

    date: {
        type: Date,
        default: Date.now
    }
});

// Exportando el modelo
module.exports = mongoose.model('User', userSchema);