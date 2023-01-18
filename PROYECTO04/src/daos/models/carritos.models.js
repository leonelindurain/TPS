const mongoose = require('mongoose')

const CartsSchema = new mongoose.Schema({ 
    email: { type: String, required: true, trim: true, unique: true},
    timestamp: { type: String, required: false, trim: true},
    products: { type: Array, required: true,},
    address: { type: String, required: false, trim: true},
})

module.exports = mongoose.model('Carts', CartsSchema)