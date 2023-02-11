const mongoose = require('mongoose')
const { mongoDbUrl } = require('../config')

const connectDB = async () => {
    try {
        const url = mongoDbUrl
        await mongoose.connect(url,{
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        logger.info('Database connected');
    } catch (error) {
        console.error(error)   
    }
}
module.exports = connectDB


