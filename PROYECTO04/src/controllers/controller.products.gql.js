const { Producto } = require("../daos/index");
const producto = new Producto();

//------ GET (Devuelve todos los productos) ------
const getProducts = async () => {
	const listaProductos = await producto.getAll();
	return listaProductos;
};

//------ GET (Devuelve un producto según ID) ------

const getProductById = async ({ id }) => {
	const productoById = await producto.getById(parseInt(id));
	return productoById;
};

//------ POST (Recibe y Agrega un producto) ------

const postProduct = async ({ data }) => {
	const idProduct = await producto.save(data);
	return idProduct;
};

//------ PUT (Recibe y Actualiza un producto según su ID) --------

const putProduct = async ({ id, data }) => {
	const response = await producto.updateById(parseInt(id), data);
	return response;
};

//------ DELETE (Elimina un producto según su ID) ------

const deleteProductById = async ({ id }) => {
	const response = await producto.deleteById(parseInt(id));
	return response;
};

module.exports = {
	getProducts,
	getProductById,
	postProduct,
	putProduct,
	deleteProductById
};