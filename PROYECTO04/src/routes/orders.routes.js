const express = require('express')
const {getOrders,getOrderById,postSendOrder,putOrder,deleteOrderById,routeNotAvailable} = require('../controllers/orders.controller')

const { Router } = express
const routerOrders = Router()

routerOrders.get('/', getOrders)
routerOrders.get('/:id', getOrderById)
routerOrders.post('/', postSendOrder)
routerOrders.put('/:id', putOrder)
routerOrders.delete('/:id', deleteOrderById)
routerOrders.get('*', routeNotAvailable)

module.exports = routerOrders