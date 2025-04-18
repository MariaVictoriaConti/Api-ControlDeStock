//Modelo de producto

const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
   // img: {type:Image, required: true},
    name: {type: String, required: true},
    price: {type: Number, required: true},
    description: {type: String, required: true},
    quantity: {type: Number, required: true},
    disponibility: {type: Boolean, required: true}
})

module.exports = mongoose.model('Product', ProductSchema);