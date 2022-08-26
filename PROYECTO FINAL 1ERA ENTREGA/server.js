const express = require ('express');
const Contenedor = require('./contenedor.js');
const app = express();
const { Router } = express;
const PORT = process.env.PORT || 8080;

app.use(express.urlencoded ({ extends: true}));
app.use(express.json());
app.use(express.static('public'));

///////////////////////////// RUTA PRODUCTOS ////////////////////////////

const routerProductos = Router();
const contenedorProductos = new Contenedor('./productos.json')
const isAdmin = true

routerProductos.get('/', async (req,res) => {
    const productos = await contenedorProductos.getAll();
    res.json ({ productos })
});

routerProductos.get('/:id', async (req,res) => {
    const { id } = req.params
    const producto = await contenedorProductos.getById(parseInt(id))
    res.json ({ producto })
});

routerProductos.post('/', async (req,res) => {
    if (isAdmin === true) {
        const objProducto = req.body
        contenedorProductos.saveProducto(objProducto)
        res.json ({ mensaje: 'Producto guardado', objProducto})
    } else {
        res.json ({ error: '404',
                    mensaje: 'Ruta no encontrada'
                 })
    }
});

routerProductos.put('/:id', async (req,res) => {
    if (isAdmin === true) {
        let hora = new Date().toLocaleTimeString()
        const { id } = req.params
        const objProducto = req.body
        contenedorProductos.updateById({...objProducto, fecha: hora, id: parseInt(id)})
        res.json({ mensaje: 'Producto actualizado'})
    } else {
        res.json ({ error: '404',
                    mensaje: 'Ruta no encontrada'
                 })
    }
});

routerProductos.delete('/:id', async (req,res) => {
    if (isAdmin === true) {
        const { id } = req.params
        contenedorProductos.deleteById(parseInt(id))
        res.json ({ mensaje: 'Producto eliminado'})
    } else {
        res.json ({ error: '404',
                    mensaje: 'Ruta no encontrada'
                 })
    }
});

app.use('/api/productos', routerProductos);

/////////////////////////////////////////////////////////////////////////

///////////////////////////// RUTA CARRITO //////////////////////////////

const routerCarrito = Router();
const contenedorCarrito = new Contenedor('./carrito.json')

routerCarrito.post('/', async (req,res) => {
    const objProducto = req.body
    contenedorCarrito.saveCarrito(objProducto)
    res.json ({ mensaje: 'Carrito creado', objProducto})
});

routerCarrito.delete('/:id', async (req,res) => {
    const { id } = req.params
    contenedorCarrito.deleteById(parseInt(id))
    res.json ({ mensaje: 'Carrito eliminado'})
});

routerCarrito.get('/:id/productos', async (req,res) => {
    const { id } = req.params
    const carrito = await contenedorCarrito.getById(parseInt(id))
    listaProductos = carrito.productos
    res.json ({ listaProductos })
});

routerCarrito.post("/:id/productos", async (req, res) => {
	const { id } = req.params;
	const objCarrito = req.body;
	console.log(objCarrito);
	const contenedorCarrito = new Contenedor ("./carrito.json")
	carritoByID = await contenedorCarrito.addProductToCart(id, objCarrito)
	res.json({ message: "Producto guardado", carritoByID })
});

routerCarrito.delete('/:idCart/productos/:idProduct', async (req,res) => {
    const { idCart, idProduct } = req.params
    await contenedorCarrito.deleteProductById(parseInt(idCart), parseInt(idProduct))
    res.json ({ mensaje: 'Producto eliminado correctamente del carrito'})
})

app.use('/api/carrito', routerCarrito);

/////////////////////////////////////////////////////////////////////////

app.listen(PORT, err => {
    if(err) throw err
    console.log(`Server running on port ${PORT}`)
});