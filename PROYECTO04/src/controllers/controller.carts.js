const { Carrito } = require("../daos/index.js");
const logger = require("../logs/loggers.js");
const Carritos = new Carrito();

const getCart = async (req, res) => {
	const { username } = await req.user;
	console.log("usuario", username);

	try {
		let carrito = await Carritos.getByEmail(username);
		let products = carrito.products;
		await res.render("carrito", {
			username: username,
			products: products
		});
	} catch (e) {
		let products = [];
		await res.render("carrito", {
			username: username,
			products: products
		});
	}
};

const postCart = async obj => {
	return Carritos.save(obj);
};

const addProductToCart = async (req, res, idCart, product) => {
	const { username } = await req.user;
	try {
		let cartById = await Carritos.getByEmail(username);
		console.log(cartById);
		let timestamp = Date.now();
		if (cartById) {
			await cartById.products.push(product);
			await this.modelo.updateOne(
				{ id: idCart },
				{ $set: { products: cartById.products } }
			);
			return cartById;
		} else {
			postCart(product);
		}
	} catch (error) {
		logger.error(error);
	}
};

const deleteCartProduct = async (req, res) => {
	const idProduct = req.params.id;
	const { username } = await req.user;
	try {
		await Carrito.deleteOneProduct(username, idProduct);
		res.redirect(`/carrito`);
	} catch (err) {
		logger.error(err);
	}
};
const comprarProduct = async (req, res) => {
	const username = await req.user.username;
	try {
		await Carritos.deleteAllProductsFromCart(username);
		res.redirect(`/productos`);
	} catch (err) {
		logger.error(err);
	}
};

module.exports = {
	getCart,
	addProductToCart,
	deleteCartProduct,
	comprarProduct
};