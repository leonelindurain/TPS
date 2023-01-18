const { response } = require('express')
const {productsDao} = require("../daos/index");
const product = productsDao

const administrator = true

const getProducts = async (req, res) => {
    const productsList = await product.getAll()
    res.json(productsList)
}

const getProductById = async (req, res) => {
    const { id } = req.params
    const productById = await product.getById(id)
    productById ?
        res.json(productById)
        :
        res.json({ error: 'Producto no encontrado' })
}

const getProductByCategory = async (req, res) => {
    const { category } = req.params

    const productByCategory = await product.getProductByCategory(category)
    productByCategory ?
        res.json(productByCategory)
        :
        res.json({ error: 'Producto no encontrado' })
}

const postProduct = async (req, res) => {
    if (administrator) {
        const idProduct = await product.save(req.body)
        res.json(idProduct)
    }
    else {
        res.json({
            error: -1,
            description: "Ruta api/productos, Método POST, No autorizado"
        })
    }
}

const putProduct = async (req, res) => {
    if (administrator) {
        const { id } = req.params
        const res = await product.updateById(id, req.body)
        res.json(res)
    }
    else {
        res.json({
            error: -1,
            description: "Ruta api/productos/id, Método PUT, No autorizado"
        })
    }
}

const deleteProductById = async (req, res) => {
    if (administrator) {
        const { id } = req.params
        await product.deleteById(id)
    }
    else {
        res.json({
            error: -1,
            description: "Ruta api/productos/id, Método DELETE, No autorizado"
        })
    }
}

const routeNotAvailable = async (req, res) => {
    res.json({
        error: -2,
        description: "Ruta no implementada"
    })
}

module.exports = {
    getProducts,
    getProductById,
    getProductByCategory,
    postProduct,
    putProduct,
    deleteProductById,
    routeNotAvailable
}