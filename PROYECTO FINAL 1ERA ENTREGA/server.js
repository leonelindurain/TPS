const express = require ('express')
const routerCarrito = require('./microService/Carrito/routes/CarritoRoutes')
const routerProductos = require('./microService/Productos/routes/ProductosRoutes')

const app = express()

const PORT = process.env.PORT || 8080

app.use(express.urlencoded({ extends: true}))
app.use(express.json())
app.use(express.static('public'))

app.use('/api/productos', routerProductos)
app.use('/api/carrito', routerCarrito)

app.listen(PORT, err => {
    if(err) throw err
    console.log(`Server running on port ${PORT}`)
})