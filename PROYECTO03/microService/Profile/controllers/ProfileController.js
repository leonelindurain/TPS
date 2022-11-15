const LoginDaoMongoDB = require("../../Login-Logout-Register/Daos/LoginDaoMongoDB")
const contenedorProfile = new LoginDaoMongoDB

const getProfile = (req,res) => {
	if (req.isAuthenticated()) {
		let user = req.user
		res.render("profileUser")
	} else {
		console.log("Usuario no logueado")
		res.render("login")
	}
}

const getProfileUser = (req,res) => {
	if (req.isAuthenticated()) {
		let user = req.user
		res.render("profile")
	} else {
		console.log("Usuario no logueado")
		res.render("login")
	}
}

const postProfileUser = async (req,res) => {
	const {username} = req.params
	const objUser = req.body
	await contenedorProfile.updateByUser(objUser,username)
	res.render("profileUser")
}

module.exports = {
    getProfile,
    getProfileUser,
    postProfileUser
}