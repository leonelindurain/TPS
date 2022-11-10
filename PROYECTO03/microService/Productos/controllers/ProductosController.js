const ContenedorProductos = require("../Daos/ProductosDaoMongoDB")
const contenedorProductos = new ContenedorProductos()

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
        const objProducto = req.body
        contenedorProductos.saveProducto(objProducto)
        res.json ({ mensaje: 'Producto guardado', objProducto})
}

const putProduct = (req,res = response) => {
        let hora = new Date().toLocaleTimeString()
        const { id } = req.params
        const objProducto = req.body
        contenedorProductos.updateById({...objProducto, fecha: hora, id: parseInt(id)})
        res.json({ mensaje: 'Producto actualizado'})
}

const deleteProduct = (req,res = response) => {
        const { id } = req.params
        contenedorProductos.deleteById(parseInt(id))
        res.json ({ mensaje: 'Producto eliminado'})
}

module.exports = {
    getProduct,
    getProductId,
    postProduct,
    putProduct,
    deleteProduct
}