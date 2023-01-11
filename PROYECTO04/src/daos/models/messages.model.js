const mongoose = require('mongoose')

const MessagesSchema = new mongoose.Schema({ 
      email: { type: String, require: true },
      type: { type: String, require: true },
      timestamp: { type: String, require: true },
      text: { type: String, require: true },
})

module.exports = mongoose.model('Messages', MessagesSchema)