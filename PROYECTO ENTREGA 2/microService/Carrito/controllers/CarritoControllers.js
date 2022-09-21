const { response } = require("express")
const carritosDao = require("../../switch.js")
const carritosApi = carritosDao

const contenedorCarrito = new carritosApi()

const getCart = async (req,res = response) => {
    const { id } = req.params
    const carrito = await contenedorCarrito.getById(parseInt(id))
    listaProductos = carrito.productos
    res.json ({ listaProductos })
}

const postCart = (req,res = response) => {
    const objProducto = req.body
    contenedorCarrito.saveCarrito(objProducto)
    res.json ({ mensaje: 'Carrito creado', objProducto})
}

const postProductCart = async (req,res = response) => {
    const { id } = req.params;
	const objCarrito = req.body;
	console.log(objCarrito);
	carritoByID = await contenedorCarrito.addProductToCart(id, objCarrito)
	res.json({ message: "Producto guardado", carritoByID })
}

const deleteCart = (req,res = response) => {
    const { id } = req.params
    contenedorCarrito.deleteById(parseInt(id))
    res.json ({ mensaje: 'Carrito eliminado'})
}

const deleteProductCart = async (req,res = response) => {
    const { idCart, idProduct } = req.params
    await contenedorCarrito.deleteProductById(parseInt(idCart), parseInt(idProduct))
    res.json ({ mensaje: 'Producto eliminado correctamente del carrito'})
}

module.exports = {
    getCart,
    postCart,
    deleteCart,
    deleteProductCart,
    postProductCart
}