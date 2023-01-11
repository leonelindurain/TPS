const express = require('express')
const {getOrders,getOrderById,postSendOrder,putOrder,deleteOrderById,routeNotAvailable} = require('../controllers/orders.controller')

const { Router } = express
const routerOrders = Router()

//********************** GET (Devuelve todos los productos) **********************************
routerOrders.get('/', getOrders)

//********************** GET (Devuelve un producto según ID) **********************************
routerOrders.get('/:id', getOrderById)

//************************ POST (Recibe y Agrega un producto) **********************************
routerOrders.post('/', postSendOrder)

//************************ PUT (Recibe y Actualiza un producto según su ID) ***********************
routerOrders.put('/:id', putOrder)

//************************ DELETE (Elimina un producto según su ID) ***********************
routerOrders.delete('/:id', deleteOrderById)

//********************** '*' Rest of the routes **********************************
routerOrders.get('*', routeNotAvailable)

module.exports = routerOrders