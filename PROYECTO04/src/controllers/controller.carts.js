const { Carrito } = require("../daos/index.js");
const logger = require("../logs/loggers.js");
const Carritos = new Carrito();

const getAllCart = async (req, res) => {
	const { username } = await req.user;
	try {
		let carrito = await Carritos.getAll();
		let products = carrito.products;
		await res.render("carrito", {
			username: username,
			products: products
		});
	} catch (e) {
		logger.error(e);
	}
};

const createCart = async (req, res) => {
	try {
		const { clientId } = req;
		const id = await Carritos.createCart(clientId);
		res.status(200).json({ id });
	} catch (error) {
		logger.error(error);
	}
};

const deleteCartById = async (req, res, next) => {
	const { id } = req.params;
	try {
		const msg = await Carritos.deleteById(id);
		res.status(200).json(msg);
	} catch (error) {
		next(error);
	}
};

const getAllProductsFromCartByClientId = async (req, res, next) => {
	const { clientId } = req.params;
	try {
		const productsFromCart = await Carritos.getProducts(clientId);
		res.status(200).json(productsFromCart);
	} catch (error) {
		next(error);
	}
};

const addProductToCartById = async (req, res) => {
	const { id, idProd } = req.params;

	const { quantity } = req.body;
	try {
		const msg = await Carritos.insertProduct(id, idProd, quantity);
		res.status(200).json(msg);
	} catch (error) {
		createCart(id);
		logger.error(error);
	}
};

const deleteProductFromCartByClientId = async (req, res, next) => {
	const { clientId, idProd } = req.params;
	try {
		const msg = await Carritos.deleteProduct(clientId, idProd);
		res.status(200).json(msg);
	} catch (error) {
		next(error);
	}
};

module.exports = {
	getAllCart,
	createCart,
	deleteCartById,
	getAllProductsFromCartByClientId,
	addProductToCartById,
	deleteProductFromCartByClientId
};