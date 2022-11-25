const { Router } = require("express")
const { getLogin, getLogout, getFailLogin, postLogin, getRegister, getFailRegister, postRegister } = require("../CONTROLLERS/LoginController")
const routerLogin = Router()

routerLogin.get('/login', getLogin)
routerLogin.get('/logout', getLogout)
routerLogin.get('/faillogin', getFailLogin)
routerLogin.post('/login', postLogin)

module.exports = { routerLogin }