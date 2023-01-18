const {mailerSendOrder} = require('../mailer/mailer')
const {ordersDao, cartsDao} = require("../daos/index");
const order = ordersDao
const cart = cartsDao

const administrator = true

const getOrders = async (req, res) => {
    const orderList = await order.getAll()
    res.json(orderList)
}

const getOrderById = async (req, res) => {
    const { id } = req.params
    const orderById = await order.getById(id)
    orderById ?
        res.json(orderById)
        :
        res.json({ error: 'Producto no encontrado' })
}

const postSendOrder = async (req, res) => {
    const { emailId } = req.body
    const cartByEmail = await cart.getByEmail(emailId)

    productsList = cartByEmail.products
    const idOrder = await order.sendOrder(productsList, emailId)

    mailerSendOrder(productsList, emailId);

    await cart.deleteById(cartByEmail._id)

    res.json({ mensaje: "Compra confirmada", productos: productsList, idOrder })
}

const putOrder = async (req, res) => {
    if (administrator) {
        const { id } = req.params
        const result = await order.updateById(id, req.body)
        res.json(result)
    }
    else {
        res.json({
            error: -1,
            description: "Ruta api/orders/id, Método PUT, No autorizado"
        })
    }
}

const deleteOrderById = async (req, res) => {
    if (administrator) {
        const { id } = req.params
        await order.deleteById(id)
    }
    else {
        res.json({
            error: -1,
            description: "Ruta api/orders/id, Método DELETE, No autorizado"
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
    getOrders,
    getOrderById,
    postSendOrder,
    putOrder,
    deleteOrderById,
    routeNotAvailable
}