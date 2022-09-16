const ContenedorArchivo = require("../../Contenedores/ContenedorArchivo.js")

class CarritoDaoArchivo extends ContenedorArchivo {
    constructor() {
        super("./microService/Carrito/ArchivoDB/carrito.json")
    }
}

module.exports = CarritoDaoArchivo