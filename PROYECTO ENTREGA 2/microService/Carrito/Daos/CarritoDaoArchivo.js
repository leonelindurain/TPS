const ContenedorArchivo = require("../../Contenedores/ContenedorArchivo.js")

class CarritoDaoArchivo extends ContenedorArchivo {
    constructor() {
        super("./microService/DB/carritos.json")
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

}

module.exports = CarritoDaoArchivo