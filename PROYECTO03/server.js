const express = require ('express')
const Router = require("express")
const handlebars = require("express-handlebars")
const MongoStore = require("connect-mongo")
const session = require("express-session")
const cp = require("cookie-parser")
const cluster = require("cluster")
require("dotenv").config()

const app = express()

// MIDDLEWARE //

app.use(cp())
const checkAuthentication = require("./microService/config/checkAuthentication")
const passport = require("./microService/config/passportMiddleware")

app.use(express.urlencoded({ extends: true}))
app.use(express.json())
app.use(express.static('public'))

const PORT = process.env.PORT || 8080

app.set("view engine", "hbs")
app.set("views", "./public/views/layouts")
app.engine(
	"hbs",
	handlebars.engine({
		extname: ".hbs",
		defaultLayout: "",
		layoutsDir: "",
		partialsDir: __dirname + "/public/views/partials"
	})
)
app.use(
	session({
		store: MongoStore.create({
			mongoUrl: process.env.MONGODB_URL,
			mongoOptions: {
				useNewUrlParser: true,
				useUnifiedTopology: true
			}
		}),
		secret: process.env.MONGODB_SECRETO,
		resave: false,
		rolling: true,
		saveUninitialized: false,
		cookie: {
			httpOnly: false,
			secure: false,
			maxAge: 90000
		}
	})
)

// PASSPORT //

app.use(passport.initialize())
app.use(passport.session())

// INICIO //

const ContenedorProductos = require('./microService/Productos/Daos/ProductosDaoMongoDB')
const contenedorProductos = new ContenedorProductos

app.get("/", checkAuthentication, async (req, res) => {
	const productos = await contenedorProductos.getAll();
	res.render("index", { productos });
})

// REGISTER //

app.get("/register", (req, res) => {
	res.render("register")
})

app.post(
	"/register",
	passport.authenticate("register", {
		failureRedirect: "failregister",
		successRedirect: "login"
	}),
	(req, res) => {
		res.render("/login", { username: req.body.username })
	}
)

app.get("/failregister", (req, res) => {
	console.error("Error de Registro")
	res.render("failregister")
})

// LOGIN //

app.get("/login", (req, res) => {
	if (req.isAuthenticated()) {
		let user = req.user
		console.log("Usuario Logueado")
		res.render("index")
	} else {
		console.log("Usuario no logueado")
		res.render("login")
	}
})

app.post(
	"/login",
	passport.authenticate("login", {
		successRedirect: "/",
		failureRedirect: "faillogin"
	}),

	(req, res) => {
		res.render("/", { username: req.body.username })
	}
)

// LOGOUT //

app.get("/logout", async (req, res = response, next) => {
	req.logout(err => {
		if (err) {
			return next(err)
		}
		res.redirect("/")
	})
})

// CARRITO //

const { postCart, deleteCart, getCart, postProductCart, deleteProductCart } = require("./microService/Carrito/controllers/CarritoController")
const routerCarrito = Router()

routerCarrito.post('/', postCart)
routerCarrito.delete('/:id', deleteCart)
routerCarrito.get('/:id/productos', getCart)
routerCarrito.post("/:id/productos", postProductCart)
routerCarrito.delete('/:idCart/productos/:idProduct', deleteProductCart)

// PRODUCTOS //

const { getProduct, getProductId, postProduct, putProduct, deleteProduct } = require("./microService/Productos/controllers/ProductosController")
const routerProductos = Router()

routerProductos.get('/', getProduct)
routerProductos.get('/:id', getProductId)
routerProductos.post('/', checkAuthentication, postProduct)
routerProductos.put('/:id', checkAuthentication, putProduct)
routerProductos.delete('/:id', checkAuthentication, deleteProduct)

app.use('/api/productos', routerProductos)
app.use('/api/carrito', routerCarrito)

// LOGGER //

app.use((req, res, next) => {
	logger.warn("URL NOT FOUND")
	res.sendStatus("404")
})

// LISTENER //

app.listen(PORT, err => {
    if(err) throw err
    console.log(`Server running on port ${PORT}`)
})