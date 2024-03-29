const express = require('express')
const {getProducts,getProductById,getProductByCategory,postProduct,putProduct,deleteProductById,routeNotAvailable} = require('../controllers/products.controller')

const { Router } = express
const routerProducts = Router()

routerProducts.get('/', getProducts)
routerProducts.get('/:id', getProductById)
routerProducts.get('/categoria/:category', getProductByCategory)
routerProducts.post('/', postProduct)
routerProducts.put('/:id', putProduct)
routerProducts.delete('/:id', deleteProductById)
routerProducts.get('*', routeNotAvailable)


module.exports = routerProducts
