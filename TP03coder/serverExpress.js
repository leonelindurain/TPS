const fs = require ('fs');
const Contenedor = require("./contenedor");
const contenedor = new Contenedor('prueba.txt')
const express = require ('express')

const app = express()

app.get('/', (req,res) => {
    res.send (`Bienvenido usuario`)
})

app.get('/productos', async (req,res) => {
    const arrayProducto = await contenedor.getAll()
    res.send (arrayProducto)
})

app.get('/productoRandom', async (req,res) => {
    const arrayProducto = await contenedor.getAll()
    const productoRandom = arrayProducto[Math.floor(Math.random()*arrayProducto.length)]
    res.send(productoRandom)
})

const PORT = 8080

const server = app.listen (PORT, ()=> {
    console.log(`Escuchando al puerto :${server.address().port}`)
})
server.on ('Error', (err) => console.log(err))
