const mongoose = require('mongoose')

const ProductsSchema = new mongoose.Schema({ 
    description: { type: String, required: true, trim: true, max: 100},
    category: { type: String, required: true, trim: true },
    thumbnail: { type: String, required: true, trim: true, max: 200},
    price: { type: Number, required: true, trim: true},
    stock: { type: Number, required: true, trim: true},
    timestamp: { type: String, required: false, trim: true}
})

module.exports = mongoose.model('Products', ProductsSchema)