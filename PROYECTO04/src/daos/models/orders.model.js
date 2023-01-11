const mongoose = require('mongoose')

const OrdersSchema = new mongoose.Schema({ 
    
    items: { type: Array, required: true},
    orderNumber: { type: Number, required: false},
    timestamp: { type: String, required: false},
    state: { type: String, required: false },
    email: { type: String, required: true }
})

module.exports = mongoose.model('Orders', OrdersSchema)