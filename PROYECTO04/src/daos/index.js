const dotenv = require('dotenv').config() // 1

let productsDao
let cartsDao
let messagesDao
let ordersDao
let usersDao

switch (process.env.TECH) {
    case 'file':
        const ProductsDaoFile = require('./products/ProductsDaoFile')
        const CartsDaoFile = require('./carts/CartsDaoFile')
        const MessagesDaoFile = require('./messages/MessagesDaoFile')
        const OrdersDaoFile = require('./orders/OrdersDaoFile')
        const UsersDaoFile = require('./users/UsersDaoFile')

        productsDao = new ProductsDaoFile()
        cartsDao = new CartsDaoFile()
        messagesDao = new MessagesDaoFile()
        ordersDao = new OrdersDaoFile()
        usersDao = new UsersDaoFile()
        break

    case 'mongoDb':
        const ProductsDaoMongoDb = require('./products/ProductsDaoMongoDb')
        const CartsDaoMongoDb = require('./carts/CartsDaoMongoDb')
        const MessagesDaoMongoDb = require('./messages/MessagesDaoMongoDb')
        const OrdersDaoMongoDb = require('./orders/OrdersDaoMongoDb')
        const UsersDaoMongoDb = require('./users/UsersDaoMongoDb')
        
        productsDao = new ProductsDaoMongoDb()
        cartsDao = new CartsDaoMongoDb()
        messagesDao = new MessagesDaoMongoDb()
        ordersDao = new OrdersDaoMongoDb()
        usersDao = new UsersDaoMongoDb()
        break
}

module.exports = {productsDao, cartsDao, messagesDao, ordersDao, usersDao}