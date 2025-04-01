// Importamos express
const express = require('express');
const dotenv = require('dotenv');
const routes = require('./backend/Routes/routes');
const endpointLimiter = require('./backend/Middlewares/endpointLimiter')

// Concetamos a la base de datos
const connectDB = require('./backend/DataBase/dataBase')

dotenv.config()
connectDB() // aca establecemos conexion

const app = express()
app.use(express.json())

app.use(endpointLimiter);

app.use('/', routes);

app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en: http://localhost:${process.env.PORT}`);
})