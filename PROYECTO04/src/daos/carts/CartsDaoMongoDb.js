const ContainerMongoDb = require('../../containers/containerMongoDb')
const Carts = require('../models/carts.models') // 1

class CartsDaoMongoDb extends ContainerMongoDb {
    constructor() {
        super(Carts)
    }

    // addProductToCart(Number, Object) : Number (In Process)

    async addProductToCart(idCart, product) {
        try {

            let cartById = (await this.getById(idCart))
            let timestamp = Date.now()
            if (cartById) {
                cartById.products.push(product)

                await this.model.updateOne(
                    { id: idCart },
                    { $set: { products: cartById.products } }
                )
                return cartById;

            } else {
                return [];
            }

        } catch (error) {
            logger.error(error);
        }
    }

    // deleteProductById(idCart, idProduct) 

    async deleteProductById(idCart, idProduct) {
        try {
            let cart = await this.getById(idCart)
            
            logger.info(`Carrito Seleccionado: ${cart}`);
            logger.info(`Productos: ${cart.products}`);
            if (cart) {

                let filteredProducts = cart.products.filter(product => product._id !== idProduct)
                cart.products = filteredProducts
                console.log(cart.products);
                await this.updateById(idCart, cart)
                logger.info('Producto Eliminado')
            } else {
                logger.info('No se encontró el Producto')
            }

        } catch (error) {
            logger.error(error);
        }
    }

    async getByEmail(email){
        try {
            let cart = await this.model.find({email: email})
            if(cart){
                return cart[0]
            }else{
                return null
            }
        } catch (error) {
            logger.error(error)
        }
    }

}

module.exports = CartsDaoMongoDb