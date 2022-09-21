const ContenedorFirebase = require("../../Contenedores/ContenedorFirebase.js")

class ProductosDaoFirebase extends ContenedorFirebase {
    constructor() {
        super("productos")
    }

    async saveProducto(obj) {
		try {
			let guardar = await this.query.add(obj);
			return guardar.id;
		} catch (error) {
			console.log(`error al guardar: ${error}`);
		} finally {
		}
	}

}

module.exports = ProductosDaoFirebase