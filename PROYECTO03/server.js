const express = require ('express')
const Router = require("express")
const handlebars = require("express-handlebars")
const MongoStore = require("connect-mongo")
const session = require("express-session")
const cp = require("cookie-parser")
const cluster = require("cluster")
require("dotenv").config()

const app = express()

const { routerLogin } = require('./microService/Login-Logout/routes/RoutesLogin')
const { routerProductos } = require('./microService/Productos/routes/RoutesProductos')
const { routerCarrito } = require('./microService/Carrito/routes/RoutesCarrito')
const { routerProfile } = require('./microService/Profile/routes/RoutesProfile')
const { routerRegister } = require('./microService/Register/routes/RoutesRegister')
// MIDDLEWARE //

app.use(cp())
const passport = require("./microService/config/passportMiddleware")
app.use(express.urlencoded({ extends: true}))
app.use(express.json())
app.use(express.static('public'))

const PORT = process.env.PORT || 8080

// LOG4JS //

const logger = require("./microService/logs/loggers")

app.set("view engine", "hbs")
app.set("views", "./public/views/layouts")
app.engine(
	"hbs",
	handlebars.engine({
		extname: ".hbs",
		defaultLayout: "",
		layoutsDir: "/public/views/layouts",
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

app.get("/", async (req, res) => {
	res.render("login")
})

app.use('/', routerProfile)
app.use('/', routerLogin)
app.use('/api', routerProductos)
app.use('/api', routerCarrito)
app.use('/', routerRegister)

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