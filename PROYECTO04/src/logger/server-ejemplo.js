// app express server listening on port 4000
const express = require('express')
const logger = require('./logger')

const app = express();

// const data = ('I love GeeksforGeeks').repeat(8000) 

app.get('/sumar', (req, res) => {
    const { a, b } = req.query
    const resultado = parseInt(a) + parseInt(b)
    if (isNaN(a) || isNaN(b)) {
        logger.error('Se ingreso un valor no numerico')
        res.status(400).send('Se ingreso un valor no numerico')        
    }

    logger.info(`Se sumaron ${a} y ${b} y el resultado es ${resultado}`)
    res.send(`El resultado de la suma es ${resultado}`)
})

app.get('*', (req, res) => {
    const { url, method } = req
    logger.info(`Se recibio una peticion ${method} a la ruta ${url}`)
    res.send('no existe la ruta')
})


const server = app.listen(4000, err => {
    if (err) {
        logger.error('Error al iniciar el servidor')
    }
    logger.info('App listening on port 4000!');
})

server.on('error', err => {
    logger.error('Error en el servidor')
})