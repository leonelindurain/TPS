const express = require("express");
const handlebars = require("express-handlebars");

const Contenedor = require("./contenedor");
const { Server: HttpServer } = require("http");
const { Server: IoServer } = require("socket.io");

const app = express();
const httpServer = new HttpServer(app);
const io = new IoServer(httpServer);

app.use(express.urlencoded({ extended: true }));
const port = process.env.PORT || 8080;

const contenedor = new Contenedor("productos.json");
const comentarios = new Contenedor("mensajes.json");

io.on("connection", async socket => {
	const mensajesChat = await comentarios.getAll();
	console.log("Se contectó un usuario");

	socket.emit("mensajes-chat", mensajesChat);

	socket.on("mensaje-nuevo", async (msg) => {
		await mensajesChat.save({email: msg.body.email, comentario: msg.body.comentario, fecha: new Date().toLocaleDateString('es-ar', { weekday:"long", year:"numeric", month:"short", day:"numeric"})
		});
	})
})

app.set("view engine", "hbs");
app.set("views", "./views/layouts");

app.use(express.static("public"));

app.engine(
	"hbs",
	handlebars.engine({
		extname: ".hbs",
		defaultLayout: "",
		layoutsDir: "",
		partialsDir: __dirname + "/views/partials"
	})
);

app.get("/", async (req, res) => {
	const producto = await contenedor.getAll();
	res.render("index.hbs", {
		list: producto,
		listExist: true,
		producto: true
	});
});

app.get("/", async (req, res) => {
	const producto = await contenedor.getAll();
	res.render("productos", {
		titulo: "Cascos Modelos Varios",
		list: producto,
		listExist: true,
		producto: true
	});
});

app.post("/", async (req, res) => {
	const objProducto = req.body;
	await contenedor.save(objProducto);
	const list = true;
	res.redirect("/");
});

httpServer.listen(port, err => {
	if (err) throw new Error(`Error starting server: ${err}`);
	console.log(`Server is running on port ${port}`);
});