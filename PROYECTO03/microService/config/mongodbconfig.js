const mongoose = require("mongoose")
const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, './.env') })

const mongoConnect = async () => {
	try {
		mongoose.connect(process.env.MONGODB_URL, {
			useNewUrlParser: true,
			useUnifiedTopology: true
		})
		console.log("MongoDb conectado")
	} catch (error) {
		console.error(`error de conexion: ${error}`)
	}
}

module.exports = mongoConnect