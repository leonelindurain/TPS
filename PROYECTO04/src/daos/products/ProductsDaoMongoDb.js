const ContainerMongoDb = require('../../containers/containerMongoDb')
const Products = require('../models/products.models') // 1

class ProductsDaoMongoDb extends ContainerMongoDb {
    constructor(){
        super(Products)
    }

    async getProductByCategory(category) {
        try {
            const productsList = await this.getAll()
            let filteredProducts = productsList.filter(product => product.category == category)
            return filteredProducts

        } catch (error) {
            logger.error(error);
        }
    }

}

module.exports = ProductsDaoMongoDb