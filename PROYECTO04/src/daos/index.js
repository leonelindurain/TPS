const dotenv = require('dotenv').config() // 1

let productsDao
let cartsDao
let messagesDao
let ordersDao
let usersDao

switch (process.env.TECH) {
    case 'Archivo':
        const ProductsDaoArchivo = require('./products/ProductsDaoArchivo')
        const CartsDaoArchivo = require('./carrito/CartsDaoArchivo')
        const MessagesDaoArchivo = require('./msg/MessagesDaoArchivo')
        const OrdersDaoArchivo = require('./orders/OrdersDaoArchivo')
        const UsersDaoArchivo = require('./users/UsersDaoArchivo')

        productsDao = new ProductsDaoArchivo()
        cartsDao = new CartsDaoArchivo()
        messagesDao = new MessagesDaoArchivo()
        ordersDao = new OrdersDaoArchivo()
        usersDao = new UsersDaoArchivo()
        break

    case 'mongoDB':
        const ProductsDaoMongoDB = require('./products/ProductsDaoMongoDB')
        const CartsDaoMongoDB = require('./carrito/CartsDaoMongoDB')
        const MessagesDaoMongoDB = require('./msg/MessagesDaoMongoDB')
        const OrdersDaoMongoDB = require('./orders/OrdersDaoMongoDB')
        const UsersDaoMongoDB = require('./users/UsersDaoMongoDB')
        
        productsDao = new ProductsDaoMongoDB()
        cartsDao = new CartsDaoMongoDB()
        messagesDao = new MessagesDaoMongoDB()
        ordersDao = new OrdersDaoMongoDB()
        usersDao = new UsersDaoMongoDB()
        break
}

module.exports = {productsDao, cartsDao, messagesDao, ordersDao, usersDao}