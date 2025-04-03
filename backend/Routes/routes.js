//Aca van todas las rutas tanto de users como de products, tambien se puede hacer un archivo por cada entidad pero no es necesario, ver que prefiere la mayoria

const express = require('express');
const { addProduct, getAllProducts, getProductById, updateProductById, deleteProductById, getProductsByCategory } = require('../Controllers/productController')
const { registerUser, loginUser, getAllUsers, getUserById, deleteUserById, updateUser } = require('../Controllers/userController')
const { loginLimiter } = require('../Middlewares/loginLimiter')
const middleware = require('../Middlewares/auth')
const router = express.Router()

// Rutas de productos
router.get('/allProducts', getAllProducts) //Aca deberiamos hacer endpoint mas especificos: /getAllProducts, /getProductById, /addProduct etc
router.get('/:id', getProductById)
router.get('/products/:name', getProductsByCategory)
router.post('/addProduct', middleware.authenticate, addProduct)
router.put('/:id', updateProductById)
router.delete('/:id', deleteProductById)

// Rutas de usuarios
router.post('/register', registerUser)
router.post('/login', loginLimiter, loginUser)
router.get('/users/getAll', getAllUsers)
router.get('/users/:id', getUserById)
router.put('/updateUser/:id', updateUser)
router.delete('/deleteUser/:id', deleteUserById)

module.exports = router;

// FALTAN: autenticacion (middleware)