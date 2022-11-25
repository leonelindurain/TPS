const mongoose = require("mongoose")
require('dotenv').config()

const mongoConnect = () => {
	try {
		mongoose.connect(process.env.MONGODB_URL, {
		useNewUrlParser: true,
		useFindAndModify: false,
		useUnifiedTopology: true
		})
		console.log("MongoDb conectado")
	} catch (error) {
		console.error(`error de conexion: ${error}`)
	}
}

module.exports = { mongoConnect }