const LoginDaoMongoDB = require("../../Login-Logout/Daos/LoginDaoMongoDB")
const contenedorProfile = new LoginDaoMongoDB()

const getProfileUser = async (req,res) => {
	const user = await contenedorProfile.getById(req.session.passport.user);
	res.render("profile", { user });
}

module.exports = {
    getProfileUser
}