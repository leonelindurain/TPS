const express = require("express");
const { Router } = express;
const routerCarrito = Router();

const {
	getAllCart,
	createCart,
	deleteCartById,
	getAllProductsFromCartByClientId,
	addProductToCartById,
	deleteProductFromCartByClientId
} = require("../controllers/controller.carts");

routerCarrito.get("/", getAllCart);
routerCarrito.post("/:clientId", createCart);
routerCarrito.delete("/:id", deleteCartById);
routerCarrito.get("/:clientId/productos", getAllProductsFromCartByClientId);
routerCarrito.post("/:id/productos/:idProd", addProductToCartById);
routerCarrito.delete(
	"/:clientId/productos/:idProd",
	deleteProductFromCartByClientId
);

module.exports = { routerCarrito };