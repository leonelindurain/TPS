const ContenedorArchivo = require("../../Contenedores/ContenedorArchivo.js")

class ProductosDaoArchivo extends ContenedorArchivo {
    constructor() {
        super("./microService/Productos/ArchivoDB/productos.txt")
    }
}

module.exports = ProductosDaoArchivo