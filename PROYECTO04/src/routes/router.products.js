const express = require("express");
const { Router } = express;
const routerProductos = Router();

const multer = require("multer");
const storage = multer({ destinantion: "/upload" });

const logger = require("../logs/loggers");
const checkAuthentication = require("../utils/checkAuthentication");

const { Producto } = require("../daos/index.js");
const Productos = new Producto();

const { generadorProductos } = require("../utils/generadorProducto");
const productosRandoms = generadorProductos();

const productoSubido = storage.fields([
	{ title: "title", thumbnail: "thumbnail", price: "price" }
]);

routerProductos.get("/productos", async (req, res) => {
	const producto = await productosRandoms;
	// y también quiero que lea de la base de dato si hay algo
	const productosDB = await Productos.getAll();
	const productosConRandoms = [...producto, ...productosDB];
	res.render("productos", {
		list: productosConRandoms,
		listExist: true,
		producto: true
	});
});

// GET trae 1 o todos los productos
routerProductos.get("/productos/:id?", (req, res) => {
	const { id } = req.params;

	if (id) {
		Productos.getById(id).then(data => {
			res.json(data);
		});
	} else {
		Productos.getAll().then(data => {
			res.json(data);
		});
	}
});

// POST crea 1 producto
routerProductos.post(
	"/productos",
	productoSubido,
	checkAuthentication,
	async (req, res) => {
		let timestamp = Date.now();
		let { title, price, thumbnail } = req.body;
		let producto = {
			title,
			price,
			thumbnail,
			timestamp
		};
		await Productos.save(producto);
		res.render("producto");
	}
);

// PUT modifica 1 producto
routerProductos.put("/productos/:id", checkAuthentication, (req, res) => {
	let timestamp = Date.now();
	let { title, price, thumbnail } = req.body;
	let producto = {
		title,
		price,
		thumbnail,
		timestamp
	};
	Productos.updateById(producto).then(data => {
		res.json({ id: data });
	});
});

// DELETE borra 1 producto
routerProductos.delete(
	"/productos/:id",
	checkAuthentication,
	async (req, res) => {
		const { id } = req.params;

		Productos.deleteById(id).then(data => {
			res.json({ delete: data });
		});
	}
);

module.exports = { routerProductos };