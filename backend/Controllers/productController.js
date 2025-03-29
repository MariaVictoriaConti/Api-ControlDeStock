//Controller de productos

const Product = require('../Models/productModel')

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

module.exports = {addProduct}