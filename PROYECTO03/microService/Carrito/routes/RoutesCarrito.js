const { Router } = require("express")
const { postCart, deleteCart, getCart, postProductCart, deleteProductCart } = require("../controllers/CarritoController")

const routerCarrito = Router()

routerCarrito.post('/carrito', postCart)
routerCarrito.delete('/carrito/:id', deleteCart)
routerCarrito.get('/carrito/:id/productos', getCart)
routerCarrito.post("/carrito/:id/productos", postProductCart)
routerCarrito.delete('/carrito/:idCart/productos/:idProduct', deleteProductCart)

module.exports = { routerCarrito }