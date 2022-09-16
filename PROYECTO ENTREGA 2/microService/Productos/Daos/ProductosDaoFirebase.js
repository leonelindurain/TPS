const ContenedorFirebase = require("../../Contenedores/ContenedorFirebase.js")

class ProductosDaoFirebase extends ContenedorFirebase {
    constructor() {
        super("./microService/Productos/ArchivoDB/productos.json")
    }
}

module.exports = ProductosDaoFirebase