const mongoose = require('mongoose')

const UsersSchema = new mongoose.Schema({ 
    completeName: { type: String, require: true },
    phone: { type: Number, require: true },
    email: { type: String, require: true },
    password: { type: String, require: true }
})

module.exports = mongoose.model('Users', UsersSchema)