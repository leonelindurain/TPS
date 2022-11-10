require("dotenv").config()

const CarritoDaoArchivo = require("./microService/Carrito/Daos/CarritoDaoArchivo")
const CarritoDaoFirebase = require("./microService/Carrito/Daos/CarritoDaoFirebase")
const CarritoDaoMongoDB = require("./microService/Carrito/Daos/CarritoDaoMongoDB")

const ProductoDaoArchivo = require("./microService/Productos/Daos/ProductosDaoArchivo")
const ProductoDaoMongoDB = require("./microService/Productos/Daos/ProductosDaoFirebase")
const ProductoDaoFirebase = require("./microService/Productos/Daos/ProductosDaoMongoDB")


if (process.env.DAO === "FS") {
	exports.Carrito = CarritoDaoArchivo
	exports.Producto = ProductoDaoArchivo
} else if (process.env.DAO === "MONGO") {
	exports.Carrito = CarritoDaoMongoDB
	exports.Producto = ProductoDaoMongoDB
} else if (process.env.DAO === "FB") {
	exports.Carrito = CarritoDaoFirebase
	exports.Producto = ProductoDaoFirebase
} else {
	console.log("Inténtelo de nuevo.")
}