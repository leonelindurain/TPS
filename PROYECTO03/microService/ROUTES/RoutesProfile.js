const { Router } = require("express")
const { getProfileUser } = require("../CONTROLLERS/ProfileController")
const checkAuthentication = require("../MIDDLEWARES/checkAuthentication")

const routerProfile = Router()

routerProfile.get('/profile', checkAuthentication , getProfileUser)

module.exports = { routerProfile }