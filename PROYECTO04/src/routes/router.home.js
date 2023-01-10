const express = require("express");
const { Router } = express;
const routerHome = Router();

const { Producto } = require("../daos/index.js");

const Productos = new Producto();

const checkAuthentication = require("../utils/checkAuthentication");

// note deja entrar si no estás loggeado
routerHome.get("/", checkAuthentication, async (req, res) => {
	const { username } = await req.user;
	console.log(username);
	const productos = await Productos.getAll();

	res.render("index", {
		titulo: "Productos disponibles",
		list: productos,
		listExist: true,
		username: username,
		productos: true
	});
});

module.exports = { routerHome };