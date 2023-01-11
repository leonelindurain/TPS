const ContainerMongoDb = require('../../containers/containerMongoDb')
const logger = require('../../logger/logger')
const Users = require('../models/users.model') // 1

class UsersDaoMongoDb extends ContainerMongoDb {
    constructor(){
        super(Users)
    }

    // Otras funciones diferentes

    async getByEmail(email) {
        try {
            let object = await this.model.find({ email: email })

            if (object) {
                logger.info(object)
                return object[0]
            } else {
                logger.error('El item no existe') 
                return null
            }
        } catch (error) {
            logger.error(error);
        }
    }

}

module.exports = UsersDaoMongoDb