//Aca van todas las rutas tanto de users como de products, tambien se puede hacer un archivo por cada entidad pero no es necesario, ver que prefiere la mayoria

const express = require('express');
const { addProduct, getAllProducts, getProductById, updateProductById, deleteProductById } = require('../Controllers/productController')
const { registerUser, loginUser } = require('../Controllers/userController')
const { loginLimiter } = require('../Middlewares/loginLimiter')
const router = express.Router()

// Rutas de productos
router.get('/allProducts', getAllProducts) //Aca deberiamos hacer endpoint mas especificos: /getAllProducts, /getProductById, /addProduct etc
router.get('/:id', getProductById)
router.post('/', addProduct)
router.put('/:id', updateProductById)
router.delete('/:id', deleteProductById)

// Rutas de usuarios
router.post('/register', registerUser)
router.post('/login', loginLimiter, loginUser)

module.exports = router;

// FALTAN: autenticacion (middleware)