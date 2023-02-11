require('dotenv').config()

let config = {
    mongoUser : process.env.MONGO_USER,
    mongoPass : process.env.MONGO_PASS,
    sessionSecret : process.env.SESSION_SECRET,
    sessionTime: process.env.SESSION_TIME,
}

let mongoDbUrl = ""
if (process.env.NODE_ENV === 'production') {
    mongoDbUrl = 'mongodb+srv://'+config.mongoUser+':'+config.mongoPass+'@cluster0.zdlmmvu.mongodb.net/?retryWrites=true&w=majority'
} else {
    mongoDbUrl = 'mongodb://localhost:27017/ecommerce'   
}

module.exports = {
    mongoDbUrl,
    config,
    arguments
}