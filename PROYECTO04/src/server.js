const express = require("express");
require("dotenv").config();

const handlebars = require("express-handlebars");
const MongoStore = require("connect-mongo");
const session = require("express-session");
const cp = require("cookie-parser");

const app = express();

// --- WEBSOCKET
const { Server: HttpServer } = require("http");
const { Server: IoServer } = require("socket.io");
const httpServer = new HttpServer(app);
const io = new IoServer(httpServer);

// --- middleware ----------------
app.use(cp());
const passport = require("./utils/passportMiddleware");

const { graphqlHTTP } = require("express-graphql"); // GraphQL
const routeProductGraphQL = require("./routes/router.products.gql"); // GraphQL

// --- Routers ----
const { routerHome } = require("./routes/router.home");
const { routerProductos } = require("./routes/router.products");
const { routerCarrito } = require("./routes/router.cart");
const { routerLogin } = require("./routes/router.login");
const { routerProfile } = require("./routes/router.profile");
const { routerRegister } = require("./routes/router.register");
const { routerInfo } = require("./routes/router.info");
const { routerRandom } = require("./routes/router.random");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

const PORT = process.env.PORT || 4000;

const { Chat } = require("./daos/index.js");

// LOG4JS
const logger = require("./logs/loggers");

const Chats = new Chat();

app.set("view engine", "hbs");
app.set("views", "./src/views/layouts");

app.engine(
	"hbs",
	handlebars.engine({
		extname: ".hbs",
		defaultLayout: "",
		layoutsDir: "",
		partialsDir: __dirname + "/views/partials"
	})
);

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
);

// Passport
app.use(passport.initialize());
app.use(passport.session());

// ------------ ROUTERS -----------------
// HOME
app.use("/", routerHome);
// PRODUCTOS
app.use("/api", routerProductos);
// CARRITO
app.use("/api", routerCarrito);
// LOGIN
app.use("/", routerLogin);
// PROFILE
app.use("/", routerProfile);
// REGISTER
app.use("/", routerRegister);
// ----- INFO PAGE ----
app.use("/", routerInfo);
// ----- RANDOM PAGE ----
app.use("/api", routerRandom);
// ----- GRAPHQL ----
app.use("/productGraphql", graphqlHTTP(routeProductGraphQL));

/* ------------ CHAT ------------ */
io.on("connection", async socket => {
	let mensajesChat = await Chats.getAll();
	console.log("Se contectó un usuario");

	const text = {
		text: "ok",
		mensajesChat
	};

	socket.emit("mensaje-servidor", text);

	socket.on("mensaje-nuevo", async (msg, cb) => {
		mensajesChat.push(msg);
		const text = {
			text: "mensaje nuevo",
			mensajesChat
		};

		io.sockets.emit("mensaje-servidor", text);
		await Chats.save({
			mail,
			msg,
			fecha
		});
		return (mensajesChat = await Chats.getAll());
	});
});
// ---------------------------- FIN CARRITO -------------

// logger
app.use((req, res, next) => {
	logger.warn("NONE EXISTING URL");
	res.sendStatus("404");
});

//--------- listener
httpServer.listen(PORT, () => {
	console.log(`Server listening on ${PORT}`);
});