const express = require("express");
const {
	getProductsFromCart,
	postCart,
	postProductToCart,
	deleteCartById,
	deleteProductFromCart,
	getCartByEmail,
	getAllProducts,
	routeNotAvailable
} = require("../controllers/carts.controller");

const { Router } = express;
const routeCarrito = Router();

routeCarrito.get("/:id/productos", getProductsFromCart);
routeCarrito.post("/", postCart);
routeCarrito.post("/:id/productos", postProductToCart);
routeCarrito.delete("/:id", deleteCartById);
routeCarrito.delete("/:idCart/productos/:idProduct", deleteProductFromCart);
routeCarrito.get("/:emailId", getCartByEmail);
routeCarrito.get("/", getAllProducts);
routeCarrito.get("*", routeNotAvailable);

module.exports = routeCarrito;