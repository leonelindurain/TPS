const express = require("express");
const {
	getProducts,
	getProductById,
	getProductByCategory,
	postProduct,
	putProduct,
	deleteProductById,
	routeNotAvailable
} = require("../controllers/products.controller");

const { Router } = express;
const routerProducts = Router();

//********************** GET (Devuelve todos los productos) **********************************
routerProducts.get("/", getProducts);

//********************** GET (Devuelve un producto según ID) **********************************
routerProducts.get("/:id", getProductById);

//********************** GET (Devuelve productos según Categoria) **********************************
routerProducts.get("/category/:category", getProductByCategory);

//************************ POST (Recibe y Agrega un producto) **********************************
routerProducts.post("/", postProduct);

//************************ PUT (Recibe y Actualiza un producto según su ID) ***********************
routerProducts.put("/:id", putProduct);

//************************ DELETE (Elimina un producto según su ID) ***********************
routerProducts.delete("/:id", deleteProductById);

//********************** '*' Rest of the routes **********************************
routerProducts.get("*", routeNotAvailable);

module.exports = routerProducts;