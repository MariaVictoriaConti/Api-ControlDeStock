// Importamos express
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path')
const routes = require('./backend/Routes/routes');

const port = process.env.PORT;

// Conectamos a la base de datos
const connectDB = require('./backend/DataBase/dataBase')

dotenv.config()
connectDB() // aca establecemos conexion

const app = express()
app.use(express.json())
app.use(cors()); // Habilita CORS para todas las rutas

// Servir los archivos estaticos en el front
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);

app.get('/', (req, res) => { // aca cambie * y './public/index.html'
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

app.listen(port,  () => {
    console.log(`Servidor corriendo en: http://localhost:${port}`);
})