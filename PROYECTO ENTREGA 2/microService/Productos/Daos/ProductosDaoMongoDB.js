const ContenedorMongoDB = require("../../Contenedores/ContenedorMongoDB.js")
const mongoose = require("mongoose")
const { mongoConnect } = require("../../config/mongodbconfig.js")

const productosCollection = "productos"

const productosSchema = new mongoose.Schema({
    tittle: {type: String, require: true},
    thumbnail: {type: String, require: true},
    price: {type: Number, require: true},
    stock: {type: Number, require: true}
})

const productos = mongoose.model(productosCollection, productosSchema)

class ProductosDaoMongoDB extends ContenedorMongoDB {
    constructor() {
        super(mongoConnect, productos)
    }
}

module.exports = ProductosDaoMongoDB