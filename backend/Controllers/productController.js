//Controller de productos

const Product = require('../Models/productModel')

//Funcion para obtener todos los productos
const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find()
        res.json(products)
    } catch (error) {
        console.error('No se pudo obtener todos los productos.', error)
    }
}

// Funcion para agregar un producto
const addProduct = async (req, res) => {
    try {
        const newProduct = new Product(req.body);
        await newProduct.save()
        res.json(newProduct)
    } catch (error) {
        console.error('No se pudo agregar el producto.', error)
    }
}

module.exports = {addProduct, getAllProducts}