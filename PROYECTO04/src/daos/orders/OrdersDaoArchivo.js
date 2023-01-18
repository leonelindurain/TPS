const ContainerFile = require('../../containers/containerArchivo');
const route = './database/orders.json'
const fs = require('fs');


class OrdersDaoFile extends ContainerFile {
    constructor(){
        super(route)
    }
}

module.exports = OrdersDaoFile