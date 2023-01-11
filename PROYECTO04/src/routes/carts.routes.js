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
const routerCart = Router();

//********************** GET: '/:id/productos' (Listar todos los productos de un carrito) **********************************

routerCart.get("/:id/productos", getProductsFromCart);

//********************** POST: '/' (Crea un carrito y devuelve su ID) **********************************

routerCart.post("/", postCart);

//********************** POST: '/:id/productos' (Incorporar productos al carrito) **********************************

routerCart.post("/:id/productos", postProductToCart);

//********************** DELETE: '/:id' (Vacia un carrito y lo elimina) **********************************

routerCart.delete("/:id", deleteCartById);

//********************** DELETE: '/:id/productos/:id_prod' (Eliminar un producto del carrito) **********************************

routerCart.delete("/:idCart/productos/:idProduct", deleteProductFromCart);

//********************** GET: '/email' **********************************

routerCart.get("/:emailId", getCartByEmail);

//********************** '*' Rest of the routes **********************************

routerCart.get("/", getAllProducts);

routerCart.get("*", routeNotAvailable);

module.exports = routerCart;