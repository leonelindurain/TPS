const axios = require("axios");

(async function testAxios() {
	try {
		let productNew = {
			id: "4",
			title: "Calculadora",
			thumbnail:
				"https://cdn1.iconfinder.com/data/icons/software-hardware/200/software-24-128.png",
			price: 555
		};

		let productUpdate = {
			id: "4",
			title: "Calculadora Científica",
			thumbnail:
				"https://cdn1.iconfinder.com/data/icons/software-hardware/200/software-24-128.png",
			price: 555
		};

		const getProducts = await axios.get("http://localhost:8080/api/productos");
		console.log("------ Consultando Productos: GET - /api/productos ------");
		console.log(getProducts.data);

		const postProduct = axios.post(
			"http://localhost:8080/api/productos",
			productNew
		);
		console.log("------ Agregando Producto: POST - /api/productos/ ------");
		// console.log(postProduct.data);

		const getProductById = await axios.get(
			"http://localhost:8080/api/productos/4"
		);
		console.log(
			"------ Consultando Producto Agregado: GET - /api/productos/:id ------"
		);
		console.log(getProductById.data);

		const putProductById = await axios.put(
			"http://localhost:8080/api/productos/4",
			productUpdate
		);
		console.log(
			"------ Actualizando Producto: PUT - /api/productos/:id ------"
		);
		console.log(putProductById.data);

		const getProductsAgain = await axios.get(
			"http://localhost:8080/api/productos"
		);
		console.log(
			"------ Consultando Productos Nuevamente: GET - /api/productos ------"
		);
		console.log(getProductsAgain.data);

		const deleteProductById = await axios.delete(
			"http://localhost:8080/api/productos/4"
		);
		console.log("------ Borrando Producto: DELETE - /api/productos/:id ------");
		console.log(deleteProductById.data);
	} catch (error) {
		console.log("Error: ", error.message);
	}
})();