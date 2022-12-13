const express = require("express");
const { Router } = express;
const routerLogin = Router();
const passport = require("../utils/passportMiddleware");
const logger = require("../logs/loggers");

routerLogin.post(
	"/login",
	passport.authenticate("login", {
		successRedirect: "/profile",
		failureRedirect: "faillogin"
	}),

	(req, res) => {
		logger.info("data Login");
		res.render("/", { username: req.body.username });
	}
);

routerLogin.get("/login", (req, res) => {
	if (req.isAuthenticated()) {
		let user = req.user;
		console.log("usuario logueado");
		res.render("profile", { user });
	} else {
		console.log("user no logueado");
		res.render("login");
	}
});

routerLogin.get("/faillogin", (req, res) => {
	logger.info("Error de Login");
	res.render("faillogin");
});

// logout
routerLogin.get("/logout", async (req, res = response, next) => {
	req.logout(err => {
		if (err) {
			return next(err);
		}
		res.redirect("/");
	});
});

module.exports = { routerLogin };