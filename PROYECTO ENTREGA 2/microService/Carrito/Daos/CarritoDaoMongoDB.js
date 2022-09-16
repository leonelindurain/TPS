const ContenedorMongoDB = require("../../Contenedores/ContenedorMongoDB.js")

class CarritoDaoMongoDB extends ContenedorMongoDB {
    constructor() {
        super("./microService/Carrito/ArchivoDB/carrito.json")
    }
}

module.exports = CarritoDaoMongoDB