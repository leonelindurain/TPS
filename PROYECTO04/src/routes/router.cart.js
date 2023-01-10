const express = require("express");
const { Router } = express;
const routerCarrito = Router();

const {
	getCart,
	addProductToCart,
	deleteCartProduct,
	comprarProduct
} = require("../controllers/controller.carts");

// --------- GET: get carrito --------
routerCarrito.get("/", getCart);

// --------- comprar ordern
routerCarrito.post("/comprar", comprarProduct);

// POST guardar 1 producto en 1 carrito
routerCarrito.post("/:username/:id", addProductToCart);

// --------------- DELETE: eliminar carro
routerCarrito.delete("/:id", deleteCartProduct);

module.exports = { routerCarrito };