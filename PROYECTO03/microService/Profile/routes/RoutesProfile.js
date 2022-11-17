const { Router } = require("express")
const checkAuthentication = require("../../config/checkAuthentication")
const { getProfileUser } = require("../controllers/ProfileController")

const routerProfile = Router()

routerProfile.get('/profile', checkAuthentication, getProfileUser)

module.exports = { routerProfile }