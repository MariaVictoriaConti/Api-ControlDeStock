// En este archivo se encuentran todas las rutas

const express = require('express');
const { addProduct, getAllProducts, getProductById, updateProductById, deleteProductById, getProductsByCategory } = require('../Controllers/productController')
const { registerUser, loginUser, getAllUsers, getUserById, deleteUserById, updateUser } = require('../Controllers/userController')
const { loginLimiter } = require('../Middlewares/loginLimiter')
const middleware = require('../Middlewares/auth')
const router = express.Router()

// Rutas de productos
router.get('/allProducts', getAllProducts)
router.get('/products/:name', getProductsByCategory)
router.get('/:id', getProductById)
router.post('/addProduct', middleware.authenticate, addProduct)
router.put('/:id', middleware.authenticate, updateProductById)
router.delete('/:id', middleware.authenticate, deleteProductById)

// Rutas de usuarios
router.post('/register', registerUser)
router.post('/login', loginLimiter, loginUser)
router.get('/users/getAll', getAllUsers)
router.get('/users/:id', getUserById)
router.put('/updateUser/:id', updateUser)
router.delete('/deleteUser/:id', deleteUserById)

module.exports = router;
