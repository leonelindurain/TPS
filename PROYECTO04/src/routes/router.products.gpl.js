const productsControllerGraphQL = require("../controllers/controller.products.gql.js");

const productSchema = require("../schema/products.schema.js");

routeProductGraphQL = {
	schema: productSchema,
	rootValue: {
		getProducts: productsControllerGraphQL.getProducts,
		getProductById: productsControllerGraphQL.getProductById,
		postProduct: productsControllerGraphQL.postProduct,
		putProduct: productsControllerGraphQL.putProduct,
		deleteProductById: productsControllerGraphQL.deleteProductById
	},
	graphiql: true
};

module.exports = routeProductGraphQL;