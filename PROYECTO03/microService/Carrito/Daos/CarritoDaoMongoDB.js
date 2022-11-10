const ContenedorMongoDB = require("../../Contenedores/ContenedorMongoDB.js")
const mongoose = require("mongoose")
const {mongoConnect} = require("../../config/mongodbconfig")

const carritosCollection = "carritos"

const carritosSchema = new mongoose.Schema({
    tittle: {type: String, require: true},
})

const carritos = mongoose.model(carritosCollection, carritosSchema)

class CarritoDaoMongoDB extends ContenedorMongoDB {
    constructor() {
        super(mongoConnect, carritos)
    }
}

module.exports = CarritoDaoMongoDB