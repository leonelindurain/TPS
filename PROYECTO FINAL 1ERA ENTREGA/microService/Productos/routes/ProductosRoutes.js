const { Router } = require("express")
const { getProduct, getProductId, postProduct, putProduct, deleteProduct } = require("../controllers/ProductosControllers")

const routerProductos = Router()

routerProductos.get('/', getProduct)
routerProductos.get('/:id', getProductId)
routerProductos.post('/', postProduct)
routerProductos.put('/:id', putProduct)
routerProductos.delete('/:id', deleteProduct)

module.exports = routerProductos