const connectDB = require('./connection.js') 
connectDB()

class ContainerMongoDb {

    constructor(model){
        this.model = model
    }

    // save(Object) : Number

    async save(obj) {
        try {
            let product = new this.model(obj)
            await product.save()
            logger.info('Objeto Agregado');
            return product._id
        } catch (error) {
            logger.error(error);
        }
    }

    // getByID(Number) : Object

    async getById(id) {
        try {
            let object = await this.model.findOne({_id:id})

            if (object) {
                logger.info(object)
                return object
            } else {
                logger.info('El item no existe');
                return null
            }
        } catch (error) {
            logger.error(error);
        }
    }

    // getAll() : Object[]

    async getAll() {
        try {
            let objectsC = await this.model.find({},{"__v":0})
            
            let objects = objectsC.map(element => {
               return {...element._doc, id: element._id.toString()}
            });

            if (objects) {
                return objects
            } else {
                logger.info('No hay Productos')
            }

        } catch (error) {
            logger.error(error);
        }
    }

    // updateById

    async updateById(id, product) {

        try {
            let timestamp = Date.now()
            if (this.getById(id)) {
                product.timestamp = timestamp
                await this.model.updateOne({ _id: id }, { $set: product })
                return { mensaje: 'Objeto actualizado' }
            } else {
                return { mensaje: 'Objeto no encontrado' }
            }
        } catch (error) {
            logger.error(error);
        }
    }

    // deleteById(Number) : void

    async deleteById(id) {
        try {
            if (this.getById(id)) {
                await this.model.deleteOne({ _id: id })
                logger.info('Objeto Eliminado')
            } else {
                logger.info('No se encontró el objeto')
            }

        } catch (error) {
            logger.error(error);
        }
    }

    // deleteAll() : void 

    async deleteAll() {
        await this.model.deleteMany()
        logger.info('Todos los objetos se han eliminado')
    }

}

module.exports = ContainerMongoDb