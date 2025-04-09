//En este archivo se maneja la conexión a MongoDB

// Importamos mongoose
const mongoose = require('mongoose');

// Modulo dotenv
require('dotenv').config();

// Funcion para concetar con Atlas
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log('Concetado con MongoDB.');
    } catch (error) {
        console.error('Error en la conexion con MongoDB.', error)
        process.exit(1)
    }
}

module.exports = connectDB;