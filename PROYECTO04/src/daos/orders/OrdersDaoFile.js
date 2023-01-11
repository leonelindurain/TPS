const ContainerFile = require('../../containers/containerFile');
const route = './database/orders.json'
const fs = require('fs');


class OrdersDaoFile extends ContainerFile {
    constructor(){
        super(route)
    }
}

module.exports = OrdersDaoFile