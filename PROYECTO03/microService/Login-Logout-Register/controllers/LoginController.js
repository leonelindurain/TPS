const passport = require("../../config/passportMiddleware")

const getLogin = (req, res) => {
	if (req.isAuthenticated()) {
		let user = req.user
		console.log("Usuario Logueado")
		res.render("index")
	} else {
		console.log("Usuario no logueado")
		res.render("login")
	}
}

const postLogin =
(passport.authenticate
        ("login", {
            successRedirect: "/",
            failureRedirect: "faillogin"
        }),
    (req, res) => {
        res.render("/", { username: req.body.username })
    }
)

const getFailLogin = (req, res) => {
	console.error("Error de Login")
	res.render("faillogin")
}

const getLogout = (req, res = response, next) => {
	req.logout(err => {
		if (err) {
			return next(err)
		}
		req.session.destroy((err) => {
			console.log(err)
			res.render("login")
		})
	})
}

const getRegister = (req, res) => {
	res.render("register")
}

const getFailRegister = (req, res) => {
	console.error("Error de Registro")
	res.render("failregister")
}

const postRegister = (
	passport.authenticate("register", {
		failureRedirect: "failregister",
		successRedirect: "login"
	}),
	(req, res) => {
		res.render("/login", { username: req.body.username })
	}
)
module.exports = {
    getLogin,
    getLogout,
    getFailLogin,
    postLogin,
	getRegister,
	getFailRegister,
	postRegister
}