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

	async saveCarrito(obj) {
		try {
			let hora = new Date().toLocaleTimeString()
			const productos = []
			let dataArchivo = await this.readFileFunction(this.ruta);
			if (dataArchivo.length) {
				// [].length = 0 -> false
				await fs.promises.writeFile(
					this.ruta,
					JSON.stringify(
						[...dataArchivo, { id: dataArchivo.length + 1, ...obj,fecha: hora, productos: productos }],
						null,
						2
					)
				);
				// ... spread operator -> copia el array y lo agrega al final
			} else {
				await fs.promises.writeFile(
					this.ruta,
					JSON.stringify([{ id: dataArchivo.length + 1, ...obj,fecha: hora, productos: productos }], null, 2)
				);
				console.log(`El archivo tiene id: ${dataArchivo.length + 1}`);
			}
		} catch (error) {
			console.log("error de escritura", error);
		}
	}

	async addProductToCart(idCart, product) {
		try {
			const carritoById = await this.getById(parseInt(idCart));
			if (carritoById.productos.length) {
				let productToAdd = {
					id: carritoById.productos[carritoById.productos.length - 1].id + 1,
					...product
				};
				carritoById.productos.push(productToAdd);
				await this.updateProdCarritoById(parseInt(idCart), carritoById);
				let idProduct =
					carritoById.productos[carritoById.productos.length - 1].id;
				console.log(`El producto agregado tiene el ID: ${idProduct}`);
				return idProduct;
			} else {
				let productToAdd = { id: 1, ...product };
				carritoById.productos.push(productToAdd);
				await this.updateProdCarritoById(parseInt(idCart), carritoById);

				console.log(`El producto agregado tiene el ID: 1`);
				return 1;
			}
		} catch (error) {
			console.log(error);
		}
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

	async updateProdCarritoById(id, carrito) {
		carrito.id = id;
		try {
			const carritos = await this.getAll();
			const index = carritos.findIndex(obj => obj.id === id);
			// console.log(index);
			if (index !== -1) {
				carritos[index] = carrito;
				await fs.promises.writeFile(
					this.ruta,
					JSON.stringify(carritos, null, 2)
				);
				return { mensaje: "Carrito actualizado" };
			} else {
				return { mensaje: "Carrito no encontrado" };
			}
		} catch (error) {
			console.log(error);
		}
	}

	// traer producto por id
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

	//traer todos los productos
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
	// eliminar producto por id
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

	async deleteProductById(idCart, idProduct) {
		try {
			let dataArchivo = await fs.promises.readFile(this.ruta, "utf8")
			let dataArchParse = JSON.parse(dataArchivo)
			let carrito = dataArchParse.find(carrito => carrito.id === idCart)
			let producto = carrito.productos.find(producto => producto.id === idProduct)
			console.log(producto)
			if (carrito) {
				let productosFiltrados = carrito.productos.filter(producto => producto.id !== idProduct)
				carrito.productos = productosFiltrados
				await this.updateProdCarritoById(idCart, carrito)
				console.log('Producto Eliminado')
			} else {
				console.log('Nose encontro el producto')
			}
		} catch (error) {
			console.log(error)
		}
	}
	
    // eliminar todo los productos
    async deleteAll() {
        try {
            let dataArchivo = await fs.promises.readFile(this.ruta, "utf8");
            let dataArchParse = JSON.parse(dataArchivo);
            if (dataArchParse.length) {
                await fs.promises.writeFile(this.ruta, JSON.stringify([], null, 2));
            } else {
                console.log("No hay productos que borrar");
            }
        } catch (error) {
            console.log("error de lectura", error);
        }
    }
}

module.exports = ContenedorArchivo;