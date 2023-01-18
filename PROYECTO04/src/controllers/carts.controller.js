const { response } = require("express");
const { cartsDao } = require("../daos/index");
const cart = cartsDao;

const getProductsFromCart = async (req, res) => {
	const { id } = req.params;
	const cartById = await cart.getById(id);
	productsList = cartById.products;
	res.render(productsList);
};

const postCart = async (req, res) => {
	const idCart = await cart.save(req.body);
	res.json(idCart);
};

const postProductToCart = async (req, res) => {
	const { id } = req.params;
	const productToAdd = req.body;
	cartById = await cart.addProductToCart(id, productToAdd);
	res.json(cartById);
};

const deleteCartById = async (req, res) => {
	const { id } = req.params;
	await cart.deleteById(id);
};

const deleteProductFromCart = async (req, res) => {
	const { idCart, idProduct } = req.params;
	await cart.deleteProductById(idCart, idProduct);
};

const getCartByEmail = async (req, res) => {
	const { emailId } = req.params;
	console.log("email: ", emailId);
	const cartByEmail = await cart.getByEmail(emailId);
	console.log(cartByEmail);
	res.render("carrito", {
		username: emailId,
		products: cartByEmail.products
	});
};

const getAllProducts = async (req, res) => {
	const { username } = req.params;

	try {
		let carrito = await cart.getAll();
		let products = carrito.products;
		await res.render("carrito", {
			username: username,
			products: products
		});
	} catch (e) {
		logger.error(e);
	}
};

const routeNotAvailable = async (req, res) => {
	res.json({
		error: -2,
		description: "Ruta no implementada"
	});
};

module.exports = {
	getProductsFromCart,
	postCart,
	postProductToCart,
	deleteCartById,
	deleteProductFromCart,
	getCartByEmail,
	getAllProducts,
	routeNotAvailable
};