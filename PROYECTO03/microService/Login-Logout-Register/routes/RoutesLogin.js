const { Router } = require("express")
const { getLogin, getLogout, getFailLogin, postLogin, getRegister, getFailRegister, postRegister } = require("../controllers/LoginController")
const routerLogs = Router()

routerLogs.get('/login', getLogin)
routerLogs.get('/logout', getLogout)
routerLogs.get('/faillogin', getFailLogin)
routerLogs.post('/login', postLogin)
routerLogs.get('/register', getRegister)
routerLogs.get('/failregister', getFailRegister)
routerLogs.post('/register', postRegister)

module.exports = { routerLogs }