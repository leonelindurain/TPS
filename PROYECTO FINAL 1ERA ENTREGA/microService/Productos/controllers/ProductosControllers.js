const { response } = require("express")
const Contenedor = require("../../Productos/contenedorProductos")

const contenedorProductos = new Contenedor("./productos.json")
const isAdmin = true

const getProduct = async (req,res = response) => {
    const productos = await contenedorProductos.getAll();
    res.json ({ productos })
}

const getProductId = async (req,res = response) => {
    const { id } = req.params
    const producto = await contenedorProductos.getById(parseInt(id))
    res.json ({ producto })
}

const postProduct = (req,res = response) => {
    if (isAdmin === true) {
        const objProducto = req.body
        contenedorProductos.saveProducto(objProducto)
        res.json ({ mensaje: 'Producto guardado', objProducto})
    } else {
        res.json ({ error: '404',
                    mensaje: 'Ruta no encontrada'
                 })
    }
}

const putProduct = (req,res = response) => {
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
}

const deleteProduct = (req,res = response) => {
    if (isAdmin === true) {
        const { id } = req.params
        contenedorProductos.deleteById(parseInt(id))
        res.json ({ mensaje: 'Producto eliminado'})
    } else {
        res.json ({ error: '404',
                    mensaje: 'Ruta no encontrada'
                 })
    }
}

module.exports = {
    getProduct,
    getProductId,
    postProduct,
    putProduct,
    deleteProduct
}