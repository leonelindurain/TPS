const ContenedorFirebase = require("../../Contenedores/ContenedorFirebase.js")

class CarritoDaoFirebase extends ContenedorFirebase {
    constructor() {
        super("./microService/Carrito/ArchivoDB/carrito.json")
    }
}

module.exports = CarritoDaoFirebase