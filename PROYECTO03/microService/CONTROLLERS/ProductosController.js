const ContenedorProductos = require("../DAOS/DaoMongoDB/ProductosDaoMongoDB")
const contenedorProductos = new ContenedorProductos()

const getProduct = async (req,res) => {
    await contenedorProductos.getAll()
    res.render("products")
}

const getProductId = async (req,res) => {
    const { id } = req.params
    await contenedorProductos.getById(parseInt(id))
    res.render("productos")
}

const postProduct = (req,res) => {
    const objProducto = req.body
    contenedorProductos.save(objProducto)
    res.render("productos")
}

const putProduct = (req,res) => {
    let hora = new Date().toLocaleTimeString()
    const { id } = req.params
    const objProducto = req.body
    contenedorProductos.updateById({...objProducto, fecha: hora, id: parseInt(id)})
    res.render("productos")
}

const deleteProduct = (req,res) => {
    const { id } = req.params
    contenedorProductos.deleteById(parseInt(id))
    res.render("productos")
}

module.exports = {
    getProduct,
    getProductId,
    postProduct,
    putProduct,
    deleteProduct
}