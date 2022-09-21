const fs = require("fs");

class ContenedorArchivo {
	constructor(ruta) {
		this.ruta = ruta;
	}

	async readFileFunction(ruta) {
		let archivo = await fs.promises.readFile(ruta, "utf8");
		let archivoParsed = await JSON.parse(archivo);
		return archivoParsed;
	}

	async updateById(obj) {
		try {
			const dataArch = await this.readFileFunction(this.ruta);
			const objIndex = dataArch.findIndex(prod => parseInt(prod.id) === parseInt(obj.id));
			dataArch[objIndex] = obj;
			if (dataArch.length > 0 ) {
				await fs.promises.writeFile(this.ruta,JSON.stringify([...dataArch], null, 2));
				return obj.id
			} else {
				return objIndex
			}
		} catch (error) {
			console.log("error de lectura", error);
		}
	}

	async getById(id){
		try {
			let dataArchivo = await fs.promises.readFile(this.ruta, 'utf-8')
			let dataArchivoParse = JSON.parse(dataArchivo)
			let producto = dataArchivoParse.find(producto => producto.id === id)
			if (producto) {
				console.log(producto)
				return producto
			 } else {
				console.log('No se encontro el producto')
				return null
			 } 
		} catch (error) {
			console.log(error)
		}
	}

	async getAll() {
		try {
			const dataArchivo = await this.readFileFunction(this.ruta);
			if (dataArchivo.length) {
				//console.log(dataArchParse);
				return dataArchivo;
			} else {
				console.log("No hay productos");
                return dataArchivo;
			}
		} catch (error) {
			console.log("error de lectura", error);
		}
	}

	async deleteById(id) {
		try {
			let dataArchivo = await fs.promises.readFile(this.ruta, 'utf-8')
			let dataArchivoParse = JSON.parse(dataArchivo)
			if (dataArchivoParse.length === 1) {
				await fs.promises.writeFile(this.ruta, '' , 'utf-8')
				console.log('Se elimino el producto correctamente, ya no hay productos cargados')
				return 
			}
			let producto = dataArchivoParse.find(producto => producto.id === id)
			if (producto) {
				let dataArchivoParseBorrar = dataArchivoParse.filter (producto => producto.id !== id)
				await fs.promises.writeFile(this.ruta, JSON.stringify(dataArchivoParseBorrar, null, 2), 'utf-8')
				console.log('Producto eliminado')
				return 1
			} else {
				console.log('No se encontro el producto')
				return 0
			} 
		} catch (error) {
			console.log(error)
		}
	}
}

module.exports = ContenedorArchivo;