const ContenedorMongoDB = require("../../Contenedores/ContenedorMongoDB.js")
const mongoose = require("mongoose")
const {mongoConnect} = require("../../config/mongodbconfig")

const productosCollection = "productos"

const productosSchema = new mongoose.Schema({
    tittle: {type: String, require: true},
    description: {type: String, require: true},
    code: {type: String, require: true},
    price: {type: Number, require: true},
    stock: {type: Number, require: true},
    thumbnail: {type: String, require: true}
})

const productos = mongoose.model(productosCollection, productosSchema)

class ProductosDaoMongoDB extends ContenedorMongoDB {
    constructor() {
        super(mongoConnect, productos)
    }
}

module.exports = ProductosDaoMongoDB