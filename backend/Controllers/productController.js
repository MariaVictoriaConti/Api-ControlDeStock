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
        console.log("Producto agregado con exito!");        
        res.json({message: 'Producto agregado con exito!'})
    } catch (error) {
        console.error('No se pudo agregar el producto.', error)
    }
}

//Funcion para actualizar un producto por ID - FUNCIONA
const updateProductById = async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new : true })
        console.log("Producto actualizado con exito!");
        res.json({message: 'Producto actualizado con exito!'})
            } catch (error) {
        console.error('No se pudo actualizar el producto por ID.', error)
    }
}

//Funcion para eliminar un producto por ID - FUNCIONA
const deleteProductById  = async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id)
        return res.json({message: 'Producto eliminado con exito!'})
    } catch (error) {
        console.error('Error al eliminar el producto.')
        return res.status(500).json({message: 'Error al eliminar el producto.'})
    }
}

//Funcion para obtener un producto por categoría - FUNCIONA
const getProductsByCategory = async (req, res) => {
    try {
        const category = req.params.name;
        const products = await Product.find({name: category});
        if (products.length === 0) {
            return res.status(404).json({message:'No hay productos en esta categoría'});
        }
        res.json(products);
    } catch (error) {
        console.error('Error al obtener productos por categoría:', error);
        res.status(500).json({message: 'Error del servidor'});
    }
};


module.exports = { addProduct, getAllProducts, getProductById, updateProductById, deleteProductById, getProductsByCategory }
