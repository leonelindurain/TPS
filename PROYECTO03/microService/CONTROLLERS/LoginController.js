const passport = require("../MIDDLEWARES/passportMiddleware")

const getLogin = (req, res) => {
	if (req.isAuthenticated()) {
		let user = req.user
		console.log("Usuario Logueado")
		res.render("index", {user})
	} else {
		console.log("Usuario no logueado")
		res.render("login")
	}
}

const postLogin =
(passport.authenticate
        ("login", {
            successRedirect: "index",
            failureRedirect: "faillogin"
        }),
    (req, res) => {
        res.render('index',{ username: req.body.username })
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
			res.render("login")
		})
	}

module.exports = {
    getLogin,
    getLogout,
    getFailLogin,
    postLogin,
}