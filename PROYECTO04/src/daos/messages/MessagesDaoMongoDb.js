const ContainerMongoDb = require('../../containers/containerMongoDb')
const Messages = require('../models/messages.model') // 1

class MessagesDaoMongoDb extends ContainerMongoDb {
    constructor(){
        super(Messages)
    }

    // getByEmail(Number) : Object

    async getAllByEmail(email) {
        try {
            const messagesList = await this.getAll()
            console.log(email);
            let filteredMessages = messagesList.filter(message => message.email == email)
            return filteredMessages

        } catch (error) {
            logger.error(error);
        }
    }

}

module.exports = MessagesDaoMongoDb