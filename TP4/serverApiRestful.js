const Contenedor = require("./contenedor")
const express = require ('express')
const {Router} = express
const contenedor = new Contenedor('productos.txt')

const app = express ()
const routerProductos = Router()

app.use(express.json())
app.use(express.urlencoded ({ extended: true }))
app.use(express.static('public'))

routerProductos.get ('/', async (req,res) => {
    const productos = await contenedor.getAll()
    res.json ({
        Productos: (productos)
    })
})

routerProductos.get ('/:id', async (req,res) => {
    const { id } = req.params
    const producto = await contenedor.getById(parseInt(id))
    res.json ({
        Productos: (producto)
    })
})

routerProductos.post ('/', async (req,res) => {
    const productoCargado = await contenedor.save(req.body)
    if (productoCargado > 0) {
        res.json ({
            ok: true,
            mensaje: 'El post se agrego satifactoriamente',
            id: (productoCargado)
        })
    } else  {
        res.json ({
            ok: false,
            mensaje: 'El post no se agrego ya que el objeto se encuentra vacio',
        })
    }
})

routerProductos.put ('/:id', async (req,res) => {
    const { id } = req.params
    const objProducto = req.body
    const result = await contenedor.updateById ({...objProducto, id: parseInt(id)})
    if (result > 0) {
        res.json ({
            ok: true,
            mensaje: 'El Put modifico correctamente el producto',
            producto: (objProducto) 
    })
    } else {
        res.json ({
            ok: false,
            mensaje: 'El Put no se modifico',
    })
    }
})

routerProductos.delete ('/:id', async (req,res) => {
    const { id } = req.params
    const productoEliminado = await contenedor.deleteById(parseInt(id))
    if (productoEliminado > 0) {
    res.json ({
        Mensaje: 'Se ha eliminado el producto correctamente'
    })
}  else {
    res.json ({
        Mensaje: 'El producto seleccionado no existe'
    })
}
})

app.use ('/api/productos', routerProductos)

// routerProductos.get ('./api/productos/:id', (req,res) => {

// })

// routerProductos.post ('./api/productos', (req,res) => {

// })

// routerProductos.put ('./api/productos/:id', (req,res) => {

// })

// routerProductos.delete ('./api/productos/:id', (req,res) => {

// })

const PORT = process.env.PORT || 8080

app.listen(PORT , err => {
    if (err) throw err
    console.log (`Escuchando al puerto 8080`)
})