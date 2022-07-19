const fs = require ('fs');
class Contenedor {
    constructor(ruta){
        this.ruta = ruta
    }

    async save(obj){
        try {
        let dataArchivo = await fs.promises.readFile(this.ruta, 'utf-8')
        let dataArchivoParse = JSON.parse(dataArchivo)
        if (dataArchivoParse.length) {
            await fs.promises.writeFile(this.ruta, JSON.stringify([...dataArchivoParse, {...obj, id: dataArchivoParse[dataArchivoParse.length - 1] + 1} ], null, 2))
        } else {
        
        await fs.promises.writeFile(this.ruta, JSON.stringify([{...obj, id: 1}], null, 2))
        }
        return dataArchivoParse.length + 1
        console.log(`El producto obtuvo el id numero: ${dataArchivoParse.length + 1}`);
    } catch (error) {
        console.log(error)
    }
}

async getById(id){
    try {
        let dataArchivo = await fs.promises.readFile(this.ruta, 'utf-8')
        let dataArchivoParse = JSON.parse(dataArchivo)
        let producto = dataArchivoParse.find(producto => producto.id === id)
        if (producto) {
            return producto
            console.log(producto)
         } else {
            return null
            console.log('No se encontro el producto')
         } 
    } catch (error) {
        console.log(error)
    }
}

async getAll(){
    try {
        let dataArchivo = await fs.promises.readFile(this.ruta, 'utf-8')
        let dataArchivoParse = JSON.parse(dataArchivo)
        if (dataArchivoParse.length) {
            return dataArchivoParse
            console.log(dataArchivoParse)
        } else {
            console.log('No hay productos')
        }
    } catch (error) {
        return null
        console.log(error)
    }
}

async deleteById(id) {
    try {
        let dataArchivo = await fs.promises.readFile(this.ruta, 'utf-8')
        let dataArchivoParse = JSON.parse(dataArchivo)
        let producto = dataArchivoParse.find(producto => producto.id === id)
        if (producto) {
            let dataArchivoParseBorrar = dataArchivoParse.filter (producto => producto.id !== id)
            await fs.promises.writeFile(this.ruta, JSON.stringify(dataArchivoParseBorrar, null, 2), 'utf-8')
            return null
            console.log('Producto eliminado')
         } else {
            return null
            console.log('No se encontro el producto')
         } 
    } catch (error) {
        console.log(error)
    }
}
async deleteAll(){
    try {
        await fs.promises.writeFile(this.ruta, JSON.stringify([], null, 2), 'utf-8')
            return null
            console.log('Se han eliminado todos los productos')
    } catch (error) {
        console.log (error)
    }
}
}

module.exports = Contenedor;