//Aca van todas las rutas tanto de users como de products, tambien se puede hacer un archivo por cada entidad pero no es necesario, ver que prefiere la mayoria

const express = require('express');
const { addProduct, getAllProducts, getProductById } = require('../Controllers/productController')
const router = express.Router()


router.get('/', getAllProducts) //Aca deberiamos hacer endpoint mas especificos: /getAllProducts, /getProductById, /addProduct etc
router.get('/:id', getProductById)
router.post('/', addProduct)

// router.post('/', async (req, res) => {
//     try {
//         await addProduct;
//     } catch (error) {
//         res.status(500).json({ message: 'Error al agregar el producto', error: error.message });
//     }
// });

module.exports = router;