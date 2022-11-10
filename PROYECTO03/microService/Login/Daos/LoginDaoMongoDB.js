const mongoose = require("mongoose")
const ContenedorMongodb = require("../../Contenedores/ContenedorMongoDB")
const mongoConnect = require("../../config/mongodbconfig")

const loginsCollections = "logins"

const LoginSchema = new mongoose.Schema({
	username: { type: String, require: true, unique: true },
	password: { type: String, require: true }
})

const logins = mongoose.model(loginsCollections, LoginSchema)

class LoginDaoMongoDB extends ContenedorMongodb {
	constructor() {
		super(mongoConnect, logins)
	}

	// getByMail
	async getByUser(username) {
		const doc = await this.modelo.findOne({ username })
		if (!doc) return null
		return doc
	}
}

module.exports = LoginDaoMongoDB