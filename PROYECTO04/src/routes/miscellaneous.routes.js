const express = require("express");
const router = express.Router();
const { arguments } = require('../config');
const numCPUs = require('os').cpus().length
const logger = require('../logger/logger');
const dotenv = require('dotenv').config()

const { mongoDbUrl } = require('../config')


router.get("", (req, res) => {

    const { url, method } = req
    logger.info(`Se recibio una peticion ${method} a la ruta ${url}`)

    info = {
        enviroment: process.env.NODE_ENV,
        port: process.env.PORT,
        mode: process.env.MODE,
        tech: process.env.TECH,
        mongo_connection: mongoDbUrl,
        email_admin: process.env.MAIL_ADMIN,
        session_time: process.env.SESSION_TIME,
        numCPUs: numCPUs
    }
    res.render('info', { info });
});

module.exports = router