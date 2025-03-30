//Controller de productos

const Product = require('../Models/productModel')

//Funcion para obtener todos los productos - FUNCIONA
const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find()
        res.json(products)
    } catch (error) {
        console.error('No se pudo obtener todos los productos.', error)
    }
}

//Funcion para obtener un producto por ID - FUNCIONA
const getProductById = async (req, res) => {
    try {
        const productId = req.params.id;
        const product = await Product.findById(productId)
        res.json(product)
    } catch (error) {
        console.error('No se pudo obtener el producto por ID.', error)
    }
}

// Funcion para agregar un producto - FUNCIONA
const addProduct = async (req, res) => {
    try {
        const newProduct = new Product(req.body);
        await newProduct.save()
        res.json(newProduct)
    } catch (error) {
        console.error('No se pudo agregar el producto.', error)
    }
}

//Funcion para actualizar un producto por ID - FUNCIONA
const updateProductById = async (req, res) => {
    try {
        // const productId = req.params.id;
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new : true })
        res.json(product)
    } catch (error) {
        console.error('No se pudo actualizar el producto por ID.', error)
    }
}

//Funcion para eliminar un producto por ID - FUNCIONA
const deleteProductById  = async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id)
        res.json({message: 'Producto eliminado'})
    } catch (error) {
        console.error('Error al eliminar el producto.')
    }
}


module.exports = { addProduct, getAllProducts, getProductById, updateProductById, deleteProductById }

// FALTAN: buscar producto por categoria, ver la logica 