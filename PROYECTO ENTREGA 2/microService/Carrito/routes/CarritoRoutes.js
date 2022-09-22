const { Router } = require("express")
const { postCart, deleteCart, getCart, postProductCart, deleteProductCart } = require("../controllers/CarritoController")

const routerCarrito = Router()

routerCarrito.post('/', postCart)
routerCarrito.delete('/:id', deleteCart)
routerCarrito.get('/:id/productos', getCart)
routerCarrito.post("/:id/productos", postProductCart)
routerCarrito.delete('/:idCart/productos/:idProduct', deleteProductCart)

module.exports = routerCarrito