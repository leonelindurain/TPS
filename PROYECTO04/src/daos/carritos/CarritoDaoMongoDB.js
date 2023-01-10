const ContenedorMongodb = require("../../contenedores/ContenedorMongoDB.js");
const mongoose = require("mongoose");
const { mongoConnect } = require("../../utils/mongoconnect.js");
const logger = require("../../logs/loggers.js");

const carritosCollection = "carritos";

const CarritosSchema = new mongoose.Schema({
	username: { type: String, required: true, trim: true, unique: true },
	timestamp: { type: String, required: false, trim: true },
	products: { type: Array, required: true }
});

const carritos = mongoose.model(carritosCollection, CarritosSchema);

class CarritoDaoMongoDb extends ContenedorMongodb {
	constructor() {
		super(mongoConnect, carritos);
	}

	static getInstance = () => {
		if (!instanceMongoDB) {
			instanceMongoDB = new CarritoDaoMongoDb();
		}
		return instanceMongoDB;
	};

	#getProduct = async idProd => {
		try {
			const product = await this.products.getById(
				mongoose.Types.ObjectId(idProd)
			);
			return product;
		} catch (error) {
			return [];
		}
	};

	#findCartById = async id => {
		try {
			const cart = await this.modelo.findById(id);
			return cart;
		} catch (error) {
			throw [];
		}
	};
	findCartByClientId = async username => {
		try {
			const cart = this.modelo.findOne({
				username: username
			});

			return cart;
		} catch (error) {
			throw error;
		}
	};

	#updateProductToCart = async (cart, prodId, quantity) => {
		let product = cart.products.find(
			product =>
				product._id.toString() === mongoose.Types.ObjectId(prodId).toString()
		);
		if (product) {
			product.quantity += quantity;
			return true;
		} else {
			return false;
		}
	};

	createCart = async username => {
		try {
			/*Si el cliente ya tiene un carrito se devuelve el id del mismo. En caso contrario se crea un nuevo carrito*/
			let cart = await this.findCartByClientId(username);
			if (!cart) {
				cart = await this.collectionName.create({
					timestamp: new Date(),
					products: [],
					username
				});
			}

			return cart.id;
		} catch (error) {
			throw error.message;
		}
	};

	deleteById = async id => {
		try {
			const cartDeleted = await this.collectionName.findByIdAndRemove(
				{ _id: mongoose.Types.ObjectId(id) },
				{ rawResult: true }
			);
			if (!cartDeleted.value) {
				throw new Error(
					"Error al borrar: no existe un carrito con el id indicado."
				);
			}
			return { success: "El carrito ha sido eliminado con éxito." };
		} catch (error) {
			throw error.message;
		}
	};

	getProducts = async username => {
		try {
			const cart = await this.findCartByClientId(username);
			if (!cart) {
				throw new Error(
					"Error al listar: no existe un carrito con el id indicado."
				);
			}
			const productsFromCart = cart.products;
			if (!productsFromCart) {
				throw new Error(
					"Error al listar: el carrito seleccionado no tiene productos."
				);
			}
			return productsFromCart;
		} catch (error) {
			throw error.message;
		}
	};

	insertProduct = async (idCart, idProd, quantity) => {
		try {
			let cart = await this.#findCartById(idCart);
			// if (cart.length < 1) {
			// 	throw new Error(
			// 		"Error al insertar: no existe un carrito con el id indicado."
			// 	);
			// }

			let productDetail = await this.#getProduct(idProd);
			// if (productDetail.length < 1) {
			// 	throw new Error(
			// 		"Error al insertar: no existe un producto con el id indicado."
			// 	);
			// }

			const isUpdated = await this.#updateProductToCart(cart, idProd, quantity);
			if (!isUpdated) {
				cart.products.push({
					_id: mongoose.Types.ObjectId(productDetail.id),
					timestamp: productDetail.timestamp,
					name: productDetail.name,
					description: productDetail.description,
					thumbnail: productDetail.thumbnail,
					price: productDetail.price,
					quantity
				});
			}

			await this.collectionName.findByIdAndUpdate({ _id: idCart }, cart, {
				new: true
			});

			return { success: "El producto fue añadido al carrito." };
		} catch (error) {
			throw error.message;
		}
	};

	deleteProduct = async (username, idProd) => {
		try {
			const cart = await this.findCartByClientId(username);
			if (cart.length < 1) {
				throw new Error(
					"Error al borrar: no existe un carrito con el id indicado."
				);
			}

			const productDeleted = await this.collectionName.updateOne(
				{
					_id: mongoose.Types.ObjectId(cart.id)
				},
				{
					$pull: {
						products: { _id: mongoose.Types.ObjectId(idProd) }
					}
				}
			);

			if (!productDeleted.modifiedCount) {
				throw new Error(
					"Error al borrar: no existe en el carrito un producto con el id indicado."
				);
			}

			return { success: "El producto fue eliminado del carrito con éxito." };
		} catch (error) {
			throw error.message;
		}
	};
}

module.exports = CarritoDaoMongoDb;