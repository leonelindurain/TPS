const routerProducts = require("./routes/products.routes");
const routerCart = require("./routes/carts.routes");
const routerLogin = require("./routes/login.routes");
const routerChat = require("./routes/chats.routes");
const routerMessagesWebsockets = require("./routes/messages.routes");
const routerOrders = require("./routes/orders.routes");
const routerMiscellaneous = require("./routes/miscellaneous.routes.js");

const dotenv = require("dotenv").config();

const MongoStore = require("connect-mongo");
const session = require("express-session");
const passport = require("./middlewares/passportLocal.middleware");

const express = require("express");
const app = express();
const { arguments, config, mongoDbUrl } = require("./config");
const numCPUs = require("os").cpus().length;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const handlebars = require("express-handlebars");
app.engine(
	"hbs",
	handlebars.engine({
		extname: ".hbs",
		defaultLayout: "",
		layoutsDir: "",
		partialsDir: __dirname + "/views/partials"
	})
);

app.set("view engine", "hbs");
app.set("views", "./src/views/layouts");

const cluster = require("cluster");
const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");
const { log } = require("console");
const serverHttp = new HttpServer(app);
const io = new IOServer(serverHttp);
app.use(express.static("public"));

app.use(
	session({
		store: MongoStore.create({
			mongoUrl: mongoDbUrl,
			mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true }
		}),
		secret: config.sessionSecret,
		resave: true,
		saveUninitialized: true,
		rolling: true,
		cookie: {
			maxAge: 1000 * 60 * config.sessionTime
		}
	})
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/info", routerMiscellaneous);
app.use("/productos", routerProducts);
app.use("/carrito", routerCart);
app.use("/ordenes", routerOrders);
app.use("/chat", routerChat);
app.use("", routerLogin);

io.on("connection", socket => {
	logger.info("new connection IO:", socket.id);
	routerMessagesWebsockets(socket, io);
});

const MODE = process.env.MODE || "FORK";
const PORT = process.env.PORT || 8080;

if (MODE === "CLUSTER" && cluster.isMaster) {
	logger.info(`Puerto: ${PORT} - Modo: ${MODE}`);
	logger.info(`Master ${process.pid} is running`);
	for (let i = 0; i < numCPUs; i++) {
		cluster.fork();
	}
	cluster.on("exit", (worker, code, signal) => {
		logger.info(`worker ${worker.process.pid} died`);
	});
} else {
	serverHttp.listen(PORT, err => {
		if (err) logger.error("Error al iniciar el servidor");
		logger.info(
			`Servidor corriendo en el puerto ${PORT} - PID WORKER ${process.pid}`
		);
	});
}