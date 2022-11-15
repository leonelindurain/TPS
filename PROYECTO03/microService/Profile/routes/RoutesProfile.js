const { Router } = require("express")
const { getProfile, getProfileUser, postProfileUser } = require("../controllers/ProfileController")

const routerProfile = Router()

routerProfile.get('/', getProfile)
routerProfile.get('/datos', getProfileUser)
routerProfile.post('/', postProfileUser)

module.exports = { routerProfile }