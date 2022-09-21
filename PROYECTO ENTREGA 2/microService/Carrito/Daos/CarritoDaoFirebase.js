const ContenedorFirebase = require("../../Contenedores/ContenedorFirebase.js")

class CarritoDaoFirebase extends ContenedorFirebase {
    constructor() {
        super("carritos")
    }

    async saveCarrito(obj) {
		try {
			let guardar = await this.query.add(obj);
			return guardar.id;
		} catch (error) {
			console.log(`error al guardar: ${error}`);
		} finally {
		}
	}

}

module.exports = CarritoDaoFirebase