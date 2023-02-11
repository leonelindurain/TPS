const ContainerFile = require('../../containers/containerFile')
const route = './database/products.json'

class ProductsDaoFile extends ContainerFile {
    constructor(){
        super(route)
    }

}

module.exports = ProductsDaoFile