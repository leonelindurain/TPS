const { optionsMDB } = require("./mariaDB/conexionMariaDB")
const { optionSQLite } = require("./sqlite3/conexionSQLite")

const knexMariaDB = require("knex")(optionsMDB)
const knexSqlite3 = require("knex")(optionSQLite)

const products = [
    {
        title: "Casco H5",
        price: 9000,
        thumbnail: "https://www.nexon.com.ar/media/catalog/product/cache/2/image/9df78eab33525d08d6e5fb8d27136e95/h/5/h5_2.jpg",
        id: 1
      },
      {
        title: "Casco RS11",
        price: 9000,
        thumbnail: "https://www.nexon.com.ar/media/catalog/product/cache/2/image/9df78eab33525d08d6e5fb8d27136e95/h/5/h5_2.jpg",
        id: 2
      },
      {
        title: "Casco RS5",
        price: 10000,
        thumbnail: "https://http2.mlstatic.com/D_NQ_NP_678757-MLA47891037713_102021-O.webp",
        id: 3
      }
]

const tablaProductos = "products"

const batchMariaDB = async () => {
	try {
		console.log("Creando tabla Products...")
		await knexMariaDB.schema.createTable(tablaProductos, table => {
			table.increments("id")
			table.string("title")
			table.float("price")
			table.string("thumbnail")
		})

		console.log("Insertando productos...")
		await knexMariaDB(tablaProductos).insert(products)
	} catch (error) {
		console.log(`error creando tabla ${error}`)
	} finally {
		knexMariaDB.destroy()
	}
}

const messages = [
    {
        mail: "leonelindurain95@gmail.com",
        mensaje: "Hola! Todo bien ? Recien agregue unos productos al listado.",
        fecha: "22:46:57"
      },
      {
        mail: "leonelindurain95@gmail.com",
        mensaje: "Hola! Todo bien ? Recien agregue unos productos al listado.",
        fecha: "22:46:58"
      },
      {
        mail: "leonelindurain95@gmail.com",
        mensaje: "Hola! Todo bien ? Recien agregue unos productos al listado.",
        fecha: "22:46:58"
      },
      {
        mail: "leonelindurain95@gmail.com",
        mensaje: "Hola! Todo bien ? Recien agregue unos productos al listado.",
        fecha: "22:46:59"
      }
]

const tablaMensajes = "messages"

const batchSqlite3 = async () => {
	try {
		console.log("Creando tabla Mensajes...")
		await knexSqlite3.schema.createTable(tablaMensajes, table => {
			table.increments("id")
			table.string("mail")
			table.float("fecha")
			table.string("mensaje")
		})

		console.log("Insertando mensajes...")
		await knexSqlite3(tablaMensajes).insert(messages)
	} catch (error) {
		console.log(error)
	} finally {
		knexSqlite3.destroy()
	}
}

batchMariaDB()
batchSqlite3()