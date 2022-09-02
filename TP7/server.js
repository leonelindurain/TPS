const express = require("express")
const handlebars = require("express-handlebars")

const { Contenedor } = require("./contenedor")
const { Server: HttpServer } = require("http")
const { Server: IoServer } = require("socket.io")

const { optionsMDB } = require("./mariaDB/conexionMariaDB")
const { optionSQLite } = require("./sqlite3/conexionSQLite")
const knexMariaDB = require("knex")(optionsMDB)
const knexSqlite3 = require("knex")(optionSQLite)

const contenedor = new Contenedor(knexMariaDB, "products")
const comentarios = new Contenedor(knexSqlite3, "messages")

const app = express()
const httpServer = new HttpServer(app)
const io = new IoServer(httpServer)

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
const port = process.env.PORT || 8080

////////////////////////////////////////CHAT//////////////////////////////////////////

io.on("connection", async socket => {
	let mensajesChat = await comentarios.getAll()
	console.log("Se contectó un usuario")

	const mensaje = {
		mensaje: "ok",
		mensajesChat
	}

	socket.emit("mensaje-servidor", mensaje)

	socket.on("mensaje-nuevo", async (msg, cb) => {
		mensajesChat.push(msg)
		const mensaje = {
			mensaje: "mensaje nuevo",
			mensajesChat
		}

		const id = new Date().getTime()
		io.sockets.emit("mensaje-servidor", mensaje)
		cb(id)
		await comentarios.save({
			id,
			mail: msg.mail,
			mensaje: msg.mensaje,
			fecha: msg.hora
		})
	})
})

///////////////////////////////////////////////////////////////////////////////////

app.set("view engine", "hbs")
app.set("views", "./views/layouts")

app.use(express.static("public"))

app.engine(
	"hbs",
	handlebars.engine({
		extname: ".hbs",
		defaultLayout: "",
		layoutsDir: "",
		partialsDir: __dirname + "/views/partials"
	})
)

////////////////////////////////////////PRODUCTOS///////////////////////////////////

app.get("/", async (req, res) => {
	const producto = await contenedor.getAll()
	res.render("index", {
		list: producto,
		listExist: true,
		producto: true
	})
})

app.get("/", async (req, res) => {
	const producto = await contenedor.getAll()
	res.render("productos", {
		titulo: "Cascos Modelos Varios",
		list: producto,
		listExist: true,
		producto: true
	})
})

app.post("/", async (req, res) => {
	const objProducto = req.body
	contenedor.save(objProducto)
	res.redirect("/")
})

app.put("/api/productos/:id", async (req, res) => {
	const { id } = req.params
	const respuesta = await contenedor.updateById(id, req.body)
	res.json(respuesta)
	losProductos = await productos.getAll()
})

app.delete("/api/productos/:id", async (req, res) => {
	const { id } = req.params
	res.json(await contenedor.deleteById(id))
	losProductos = await contenedor.getAll()
})

app.delete("/api/productos", async (req, res) => {
	res.json(await contenedor.deleteAll())
	productos = await contenedor.getAll()
})
///////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////MENSAJES///////////////////////////////////

app.get("/api/mensajes/:id", async (req, res) => {
	const { id } = req.params
	const productoById = await comentarios.getById(id)
	productoById
		? res.json(productoById)
		: res.json({ error: "Producto no encontrado" })
})

app.put("/api/mensajes/:id", async (req, res) => {
	const { id } = req.params
	const respuesta = await comentarios.updateById(id, req.body)
	res.json(respuesta)
	mensajes = await comentarios.getAll()
})

app.delete("/api/mensajes/:id", async (req, res) => {
	const { id } = req.params
	res.json(await comentarios.deleteById(id))
	mensajes = await comentarios.getAll()
})

app.delete("/api/mensajes", async (req, res) => {
	res.json(await comentarios.deleteAll())
	mensajes = await comentarios.getAll()
})

///////////////////////////////////////////////////////////////////////////////////

httpServer.listen(port, err => {
	if (err) throw new Error(`Error starting server: ${err}`)
	console.log(`Server is running on port ${port}`)
})