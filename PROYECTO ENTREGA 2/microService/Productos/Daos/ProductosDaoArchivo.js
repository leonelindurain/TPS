const ContenedorArchivo = require("../../Contenedores/ContenedorArchivo.js")

class ProductosDaoArchivo extends ContenedorArchivo {
    constructor() {
        super("./microService/DB/productos.json")
    }

    async saveProducto(obj) {
		try {
			let hora = new Date().toLocaleTimeString()
			let dataArchivo = await this.readFileFunction(this.ruta);
			if (dataArchivo.length) {
				// [].length = 0 -> false
				await fs.promises.writeFile(
					this.ruta,
					JSON.stringify(
						[...dataArchivo, { ...obj, fecha: hora, id: dataArchivo.length + 1 }],
						null,
						2
					)
				);
				// ... spread operator -> copia el array y lo agrega al final
			} else {
				await fs.promises.writeFile(
					this.ruta,
					JSON.stringify([{ ...obj, fecha: hora, id: dataArchivo.length + 1 }], null, 2)
				);
				console.log(`El archivo tiene id: ${dataArchivo.length + 1}`);
			}
		} catch (error) {
			console.log("error de escritura", error);
		}
	}
    
}

module.exports = ProductosDaoArchivo