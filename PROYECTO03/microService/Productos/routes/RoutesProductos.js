const { Router } = require("express")
const { getProduct, getProductId, postProduct, putProduct, deleteProduct } = require("../controllers/ProductosController")
const checkAuthentication = require("../../config/checkAuthentication")

const routerProductos = Router()

routerProductos.get('/productos', getProduct)
routerProductos.get('/productos/:id', getProductId)
routerProductos.post('/productos', checkAuthentication, postProduct)
routerProductos.put('/productos/:id', checkAuthentication, putProduct)
routerProductos.delete('/productos/:id', checkAuthentication, deleteProduct)

module.exports = { routerProductos }