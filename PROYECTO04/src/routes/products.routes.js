const { Router } = require("express")
const {
	getProducts,
	getProductById,
	getProductByCategory,
	postProduct,
	putProduct,
	deleteProductById,
	routeNotAvailable
} = require("../controllers/products.controller");

const routerProducts = Router();
routerProducts.get("/", getProducts);
routerProducts.get("/:id", getProductById);
routerProducts.get("/category/:category", getProductByCategory);
routerProducts.post("/", postProduct);
routerProducts.put("/:id", putProduct);
routerProducts.delete("/:id", deleteProductById);
routerProducts.get("*", routeNotAvailable);

module.exports = routerProducts;