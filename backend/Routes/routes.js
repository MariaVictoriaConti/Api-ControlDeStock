//Aca van todas las rutas tanto de users como de products, tambien se puede hacer un archivo por cada entidad pero no es necesario, ver que prefiere la mayoria

const express = require('express');
const { addProduct, getAllProducts, getProductById, updateProductById, deleteProductById } = require('../Controllers/productController')
const { registerUser } = require('../Controllers/userController')
const router = express.Router()

// Rutas de productos
router.get('/', getAllProducts) //Aca deberiamos hacer endpoint mas especificos: /getAllProducts, /getProductById, /addProduct etc
router.get('/:id', getProductById)
router.post('/', addProduct)
router.put('/:id', updateProductById)
router.delete('/:id', deleteProductById)

// Rutas de usuarios
router.post('/register', registerUser)

module.exports = router;

// FALTAN: autenticacion (middleware)