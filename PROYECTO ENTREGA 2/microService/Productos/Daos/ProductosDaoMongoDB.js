const ContenedorMongoDB = require("../../Contenedores/ContenedorArchivo.js")

class ProductosDaoMongoDB extends ContenedorMongoDB {
    constructor() {
        super("./microService/Productos/ArchivoDB/productos.json")
    }
}

module.exports = ProductosDaoMongoDB