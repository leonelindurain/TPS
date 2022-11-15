const { Router } = require("express")
const { getProduct, getProductId, postProduct, putProduct, deleteProduct } = require("../controllers/ProductosController")
const checkAuthentication = require("../../config/checkAuthentication")

const routerProductos = Router()

routerProductos.get('/', getProduct)
routerProductos.get('/:id', getProductId)
routerProductos.post('/', checkAuthentication, postProduct)
routerProductos.put('/:id', checkAuthentication, putProduct)
routerProductos.delete('/:id', checkAuthentication, deleteProduct)

module.exports = { routerProductos }