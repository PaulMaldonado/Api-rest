// Importando mongoose
const mongoose = require('mongoose');

// Uri de conexión para base de datos
const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.pqrit.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

// Haciendo conexión
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log('Conectado a la base de datos!! :)');
})
.catch(error => {
    console.error('No se pudo conectar a la base de datos );', error);
})

mongoose.Promise = global.Promise


module.exports = mongoose;