const express = require ('express')
require("dotenv").config()

const handlebars = require("express-handlebars")
const MongoStore = require("connect-mongo")
const session = require("express-session")
const cp = require("cookie-parser")

const app = express()

// MIDDLEWARE //

app.use(cp())
const passport = require("./microService/MIDDLEWARES/passportMiddleware")

const { routerLogin } = require('./microService/ROUTES/RoutesLogin')
const { routerProductos } = require('./microService/ROUTES/RoutesProductos')
const { routerCarrito } = require('./microService/ROUTES/RoutesCarrito')
const { routerProfile } = require('./microService/ROUTES/RoutesProfile')
const { routerRegister } = require('./microService/ROUTES/RoutesRegister')

app.use(express.urlencoded({ extends: true}))
app.use(express.json())
app.use(express.static('public'))

const PORT = process.env.PORT || 8080

// LOG4JS //

const logger = require("./microService/LOGS/loggers")

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