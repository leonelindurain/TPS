const { response } = require('express')

const administrator = true

const getRoot = async (req, res) => {
    logger.info(`El usuario logueado es ${req.session.passport.user.email}`);

    res.render('index', {
        email: req.session.passport.user.email,
        completeName: req.session.passport.user.completeName,
    })
}

const getLogin = async (req, res) => {
    const { url, method } = req
    logger.info(`Se recibio una peticion ${method} a la ruta ${url}`)

    if (req.isAuthenticated()) {
        const { user } = req.user
        logger.info('user logueado')
        res.render('index', {
            email: req.session.passport.user.email,
            completeName: req.session.passport.user.completeName,
        })
    } else {
        logger.info('user no logueado')
        res.render('login')
    }
}

const postLogin = async (req, res) => {
    const { url, method } = req
    logger.info(`Se recibio una peticion ${method} a la ruta ${url}`)

    const { username, password } = req.body
    res.render('index')
}

const getLogout = async (req, res) => {
    const { url, method } = req
    logger.info(`Se recibio una peticion ${method} a la ruta ${url}`)

    let completeName = req.session.passport.user.completeName
    try {
        req.session.destroy(err => {
            if (err) {
                return res.status(500).send(`<h1>No se pudo cerrar sesion</h1>`)
            }
        })
        return res.json({ name: completeName, status: "destoyed" })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
}

const getSignup = async (req, res) => {
    const { url, method } = req
    logger.info(`Se recibio una peticion ${method} a la ruta ${url}`)

    res.render('signup')
}

const getSignupError = async (req, res) => {
    const { url, method } = req
    logger.info(`Se recibio una peticion ${method} a la ruta ${url}`)
    logger.error("Error al registrarse")

    res.render('signupError')
}

const getLoginError = async (req, res) => {
    const { url, method } = req
    logger.info(`Se recibio una peticion ${method} a la ruta ${url}`)
    logger.error("Error al loguearse")

    res.render('loginError')
}

const postSignup = async (req, res) => {
    const { url, method } = req
    logger.info(`Se recibio una peticion ${method} a la ruta ${url}`)

    res.redirect('/');
}

const getOthers = async (req, res) => {
    const { url, method } = req
    logger.warn(`Se recibio una peticion ${method} a la ruta ${url}`)

    res.send(`<h1>Ruta no existente</h1>`)
}

const getProfile = async (req, res) => {
    res.render('profile')
}

module.exports = {
    getRoot,
    getLogin,
    postLogin,
    getLogout,
    getSignup,
    getSignupError,
    getLoginError,
    postSignup,
    getOthers,
    getProfile
}