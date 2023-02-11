const express = require('express')
const {getProductsFromCart,postCart,postProductToCart,deleteCartById,deleteProductFromCart,getCartByEmail,routeNotAvailable} = require('../controllers/carts.controller')

const { Router } = express
const routerCart = Router()

routerCart.get('/:id/productos', getProductsFromCart)
routerCart.post('/', postCart)
routerCart.post('/:id/productos', postProductToCart)
routerCart.delete('/:id', deleteCartById)
routerCart.delete('/:idCart/productos/:idProduct', deleteProductFromCart)
routerCart.get('/:emailId', getCartByEmail)
routerCart.get('*', routeNotAvailable)

module.exports = routerCart

