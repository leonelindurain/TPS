const fs = require ('fs');
class Contenedor {
    constructor(ruta){
        this.ruta = ruta
    }

    async save(obj){
       
        try {
        if (fs.existsSync(this.ruta)){
        let dataArchivo = await fs.promises.readFile(this.ruta, 'utf-8')
        let dataArchivoParse = JSON.parse(dataArchivo)
        if (dataArchivoParse.length !== 0){
        var lastId = dataArchivoParse[dataArchivoParse.length-1].id + 1
        await fs.promises.writeFile(this.ruta, JSON.stringify([...dataArchivoParse, {...obj, id: lastId} ], null, 2))
        console.log(`El producto obtuvo el id numero: ${lastId}`);
        return dataArchivoParse.length + 1
        }else{
            await fs.promises.writeFile(this.ruta, JSON.stringify([{...obj, id: 1}], null, 2))
            console.log(`El producto obtuvo el id numero: ${dataArchivoParse.length + 1}`);
            return dataArchivoParse.length + 1
        }
        } else {
            await fs.promises.writeFile(this.ruta, JSON.stringify([{...obj, id: 1}], null, 2))
            console.log(`El producto obtuvo el id numero: 1`);
            return
        }
    
    } catch (error) {
        console.log(error)
    }
}

async updateById(obj) {
    try {
        let dataArchivo = await fs.promises.readFile(this.ruta, 'utf-8')
        let dataArchivoParse = await JSON.parse(dataArchivo)
        const ObjIndex = dataArchivoParse.findIndex(producto => producto.id === obj.id)
        if (ObjIndex !== -1) {
            dataArchivoParse [ObjIndex] = obj
            await fs.promises.writeFile(this.ruta, JSON.stringify ([ dataArchivoParse], null, 2))
            return ('El producto fue actualizado')
        } else  {
            return {error: 'No existe el producto'}
        }
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
            console.log(producto)
            return producto
         } else {
            console.log('No se encontro el producto')
            return null
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
            console.log(dataArchivoParse)
            return dataArchivoParse
        } else {
            console.log('No hay productos')
        }
    } catch (error) {
        console.log(error)
        return null
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
            console.log('Producto eliminado')
            return null
         } else {
            console.log('No se encontro el producto')
            return null
         } 
    } catch (error) {
        console.log(error)
    }
}

async deleteAll(){
    try {
        await fs.promises.writeFile(this.ruta, JSON.stringify([], null, 2), 'utf-8')
        console.log('Se han eliminado todos los productos')
            return null
    } catch (error) {
        console.log (error)
    }
}
}

module.exports = Contenedor;