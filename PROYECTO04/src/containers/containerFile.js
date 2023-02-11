const fs = require('fs');

class ContainerFile {
    constructor(route) {
        this.route = route
    }

    // save(Object) : Number

    async save(obj) {
        try {

            let dataArch = await fs.promises.readFile(this.route, 'utf8');
            let dataArchParse = JSON.parse(dataArch);
            let timestamp = Date.now()
            if (dataArchParse.length) {

                await fs.promises.writeFile(this.route, JSON.stringify([...dataArchParse, { id: dataArchParse[dataArchParse.length - 1].id + 1, timestamp: timestamp, ...obj }], null, 2))
                let idProduct = dataArchParse[dataArchParse.length - 1].id + 1
                console.log(`El item tiene el ID: ${idProduct}`);
                return idProduct;

            } else {

                await fs.promises.writeFile(this.route, JSON.stringify([{ id: 1, timestamp: timestamp, ...obj }], null, 2))
                console.log(`El item tiene el ID: 1`);
                return 1;

            }

        } catch (error) {
            console.log(error);
        }
    }

    // getByID(Number) : Object

    async getById(id) {
        try {
            let dataArch = await fs.promises.readFile(this.route, 'utf8')
            let dataArchParse = JSON.parse(dataArch)

            let product = dataArchParse.find(product => product.id === id)
            if (product) {
                console.log(product)
                return product
            } else {
                console.log('El item no existe');
                return null
            }
        } catch (error) {
            console.log(error);
        }
    }

    // getAll() : Object[]

    async getAll() {
        try {
            let dataArch = await fs.promises.readFile(this.route, 'utf8')
            let dataArchParse = JSON.parse(dataArch)
            if (dataArchParse.length) {
                // console.log(dataArchParse)
                return dataArchParse

            } else {
                console.log('No hay Productos')
            }

        } catch (error) {
            console.log(error);
        }
    }

    // updateById

    async updateById(id, product) {
        product.id = id

        try {
            const products = await this.getAll()
            const index = products.findIndex(obj => obj.id === id)
            let timestamp = Date.now()
            if (index !== -1) {
                product.timestamp = timestamp
                products[index] = product
                await fs.promises.writeFile(this.route, JSON.stringify(products, null, 2))
                return { mensaje: 'Producto actualizado' }

            } else {
                return { mensaje: 'Producto no encontrado' }
            }

        } catch (error) {
            console.log(error);
        }
    }

    // deleteById(Number) : void

    async deleteById(id) {
        try {
            let dataArch = await fs.promises.readFile(this.route, 'utf8')
            let dataArchParse = JSON.parse(dataArch)
            let product = dataArchParse.find(product => product.id === id)
            if (product) {
                let dataArchParseFiltered = dataArchParse.filter(product => product.id !== id)
                await fs.promises.writeFile(this.route, JSON.stringify(dataArchParseFiltered, null, 2))
                console.log('Producto Eliminado')
            } else {
                console.log('No se encontró el producto')
            }

        } catch (error) {
            console.log(error);
        }
    }

    // deleteAll() : void

    async deleteAll() {
        await fs.promises.writeFile(this.route, JSON.stringify([], null, 2), 'utf8')
        console.log('Todos los productos se han eliminado')
    }

}

module.exports = ContainerFile;