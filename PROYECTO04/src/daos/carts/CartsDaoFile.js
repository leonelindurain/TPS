const ContainerFile = require('../../containers/ContainerFile.js.js')
const route = './database/carts.json'
const fs = require('fs');


class CartsDaoFile extends ContainerFile {
    constructor(){
        super(route)
    }

    // addProductToCart(Number, Object) : Number (In Process)

    async addProductToCart(idCart, product) {
        try {

            const cartById = await this.getById(parseInt(idCart))
            let timestamp = Date.now()
            if (cartById.products.length) {

                let productToAdd = { id: cartById.products[cartById.products.length - 1].id + 1, timestamp, ...product }
                cartById.products.push(productToAdd)
                await this.updateById(parseInt(idCart), cartById)
                let idProduct = cartById.products[cartById.products.length - 1].id
                logger.info(`El producto agregado tiene el ID: ${idProduct}`);
                return idProduct;

            } else {

                let productToAdd = { id: 1, timestamp, ...product }
                cartById.products.push(productToAdd)
                await this.updateById(parseInt(idCart), cartById)

                logger.info(`El producto agregado tiene el ID: 1`);
                return 1;

            }

        } catch (error) {
            logger.error(error);
        }
    }

    // deleteProductById(idCart, idProduct) 

    async deleteProductById(idCart, idProduct) {
        idCart = parseInt(idCart)
        idProduct = parseInt(idProduct);

        try {
            let dataArch = await fs.promises.readFile(this.route, 'utf8')
            let dataArchParse = JSON.parse(dataArch)
            let cart = dataArchParse.find(cart => cart.id === idCart)
            let product = cart.products.find(product => product.id === idProduct)
            logger.info(product);
            if (product) {
                let productosFiltrados = cart.products.filter(product => product.id !== idProduct)
                cart.products = productosFiltrados
                this.updateById(idCart, cart)
                logger.info('Producto Eliminado')
            } else {
                logger.info('No se encontró el Producto')
            }

        } catch (error) {
            logger.error(error);
        }
    }

}

module.exports = CartsDaoFile