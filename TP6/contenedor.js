const fs = require ('fs');
class Contenedor {
    constructor(ruta){
        this.ruta = ruta
    }

    async readFileFunction(ruta) {
		let archivo = await fs.promises.readFile(ruta, "utf8");
		let archivoParsed = await JSON.parse(archivo);
		return archivoParsed;
    }

    async save(obj) {
		try {
			let dataArchivo = await this.readFileFunction(this.ruta);
			if (dataArchivo.length) {
				await fs.promises.writeFile(this.ruta, JSON.stringify([...dataArchivo, { ...obj, id: dataArchivo.length + 1 }], null, 2 )
            )} else { await fs.promises.writeFile(this.ruta, JSON.stringify([{ ...obj, id: dataArchivo.length + 1 }], null, 2))
				console.log(`El archivo tiene id: ${dataArchivo.length + 1}`);
			}
	    } catch (error) {
		    console.log("error de escritura", error);
	    }
    }

    async updateById(obj) {
        try {
            let dataArchivo = await fs.promises.readFile(this.ruta, 'utf-8')
            let dataArchivoParse = await JSON.parse(dataArchivo)
            const ObjIndex = dataArchivoParse.findIndex((producto) => producto.id === obj.id)
            if (ObjIndex !== -1) {
                dataArchivoParse [ObjIndex] = obj
                await fs.promises.writeFile(this.ruta, JSON.stringify (dataArchivoParse, null, 2))
                return (1)
            } else  {
                return {error: 'No existe el producto'}
            }
        } catch (error) {
            console.log(error)
            return (0)
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
            if (dataArchivoParse.length === 1) {
                await fs.promises.writeFile(this.ruta, '' , 'utf-8')
                console.log('Se elimino el producto correctamente, ya no hay productos cargados')
                return 
            }
            let producto = dataArchivoParse.find(producto => producto.id === id)
            if (producto) {
                let dataArchivoParseBorrar = dataArchivoParse.filter (producto => producto.id !== id)
                await fs.promises.writeFile(this.ruta, JSON.stringify(dataArchivoParseBorrar, null, 2), 'utf-8')
                console.log('Producto eliminado')
                return 1
            } else {
                console.log('No se encontro el producto')
                return 0
            } 
        } catch (error) {
            console.log(error)
        }
    }

    async deleteAll(){
        try {
            await fs.promises.writeFile(this.ruta, '' , 'utf-8')
            console.log('Se han eliminado todos los productos')
            return null
        } catch (error) {
            console.log (error)
        }
    }
}

module.exports = Contenedor;