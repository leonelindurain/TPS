const ContainerMongoDb = require('../../containers/containerMongoDb')
const Orders = require('../models/orders.model') // 1

class OrdersDaoMongoDb extends ContainerMongoDb {
    constructor() {
        super(Orders)
    }

    async getLastOrder() {
        try {
            let lastOrder = await this.model.find().limit(1).sort({ orderNumber: -1 })
            if (lastOrder.length == 0) {
                return 0;
            }    
            return lastOrder[0].orderNumber;
        
        } catch (error) {
            console.log("Ocurrio un error: " + error);
        }
    };

    async sendOrder(items, email) {
        console.log(email);
        try {
            let orderNumber = await this.getLastOrder() + 1;

            let orderData = {
                items: items,
                orderNumber: orderNumber,
                timestamp: new Date().toLocaleString(),
                state: 'generada',
                email: email
            }
            let id = await this.save(orderData);
            return id;
        } catch (error) {
            console.log("Guardando Orden - ocurrio un error: " + error);
        }
    };


}

module.exports = OrdersDaoMongoDb