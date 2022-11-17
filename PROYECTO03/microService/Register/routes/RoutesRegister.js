const dotenv = require("dotenv").config()

const express = require("express");
const { Router } = express;

const routerRegister = Router();

const logger = require("../../logs/loggers");
const nodemailer = require("nodemailer");

const fs = require("fs");
const path = require("path");
const imagenesPath = require("../../img/img.path");

const twilio = require("twilio");

const client = twilio(process.env.ACCOUNT_SID, process.env.AUTH_TOKEN);

const multer = require("multer");
const upload = multer();

const passport = require("../../config/passportMiddleware");

const transport = nodemailer.createTransport({
	service: "gmail",
	port: 587,
	auth: {
		user: "leonelindurain95@gmail.com",
		pass: process.env.GMAIL
	}
});

routerRegister.get("/register", (req, res) => {
	res.render("register");
});
// post para registrarse
routerRegister.post(
	"/register",
	upload.single("image"),
	passport.authenticate("register", {
		failureRedirect: "failregister",
		successRedirect: "profile"
	}),
	(req, res) => {
		fs.writeFileSync(
			path.join(imagenesPath, req.body.username + ".jpg"),
			req.file.buffer
		);

		try {
			const message = client.messages.create({
				body: "Te has registrado en la aplicacion de Leonel Indurain",
				from: process.env.TWILIO_NUMBER,
				to: req.body.phone
			});
			console.log(message);
		} catch (error) {
			console.log(error);
		}

		transport
			.sendMail({
				from: "leonelindurain95@gmail.com",
				to: "leonelindurain95@gmail.com",
				html: `<h1>Se ha registrado un nuevo Usuario ${req.body.username}</h1>`,
				subject: "Registro Usuario"
			})
			.then(result => {
				console.log(result);
			})
			.catch(console.log);
		logger.info("Usuario Registrado");

		res.render("/login", { username: req.body.username });
	}
);

//error de registro
routerRegister.get("/failregister", (req, res) => {
	console.error("Error de registro");
	// now redirect to failregister.hbs
	res.render("failregister");
});

module.exports = { routerRegister }