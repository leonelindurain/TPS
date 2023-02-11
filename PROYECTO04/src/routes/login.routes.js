const {getRoot, getLogin, postLogin, getLogout, getSignup, getSignupError, getLoginError, postSignup, getOthers, getProfile} = require('../controllers/login.controller')

const express = require("express");
const routerLogin = express.Router();
const checkAuth = require('../middlewares/auth.middleware');
const passport = require('passport')

routerLogin.get('/', checkAuth, getRoot)
routerLogin.get('/login', getLogin)
routerLogin.post('/login', passport.authenticate('login', {
  successRedirect: '/',
  failureRedirect: '/loginError',
}), postLogin)
routerLogin.get("/logout", getLogout);
routerLogin.get("/signup", getSignup)
routerLogin.get("/signupError", getSignupError)
routerLogin.get("/loginError", getLoginError)
routerLogin.post('/signup', passport.authenticate('signup', { failureRedirect: '/signupError' }), postSignup);
routerLogin.get("*", getOthers)
routerLogin.get("/profile", getProfile)

module.exports = routerLogin;
