const { response } = require('express')
const { cartsDao } = require("../daos/index");
const cart = cartsDao

const getProductsFromCart = async (req, res) => {
    const { id } = req.params
    const cartById = await cart.getById(id)
    productsList = cartById.products
    res.json(productsList)
}

const postCart = async (req, res) => {
    const idCart = await cart.save(req.body)
    res.json(idCart)
}

const postProductToCart = async (req, res) => {
    const { id } = req.params
    const productToAdd = req.body
    cartById = await cart.addProductToCart(id, productToAdd)
    res.json(cartById)
}

const deleteCartById = async (req, res) => {
    const { id } = req.params
    await cart.deleteById(id)
}

const deleteProductFromCart = async (req, res) => {
    const { idCart, idProduct } = req.params
    await cart.deleteProductById(idCart, idProduct)
}

const getCartByEmail = async (req, res) => {
    const { emailId } = req.params
    console.log("email: ", emailId);
    const cartByEmail = await cart.getByEmail(emailId)
    console.log(cartByEmail);
    res.json(cartByEmail)
}

const routeNotAvailable = async (req, res) => {
    res.json({
        error: -2,
        description: "Ruta no implementada"
    })
}

module.exports = {
    getProductsFromCart,
    postCart,
    postProductToCart,
    deleteCartById,
    deleteProductFromCart,
    getCartByEmail,
    routeNotAvailable
}