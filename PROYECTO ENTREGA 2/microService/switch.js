let productosDao
let carritosDao

switch (process.env.PRES) {
    case 'json':
        const { default: ProductosDaoArchivo } = await import('./Productos/Daos/ProductosDaoArchivo.js')
        const { default: CarritoDaoArchivo } = await import('./Carrito/Daos/CarritoDaoArchivo.js')

        productosDao = new ProductosDaoArchivo()
        carritosDao = new CarritoDaoArchivo()
        break
    case 'firebase':
        const { default: ProductosDaoFirebase } = await import('./Productos/Daos/ProductosDaoFirebase.js')
        const { default: CarritoDaoFirebase } = await import('./Carrito/Daos/CarritoDaoFirebase.js')
        
        productosDao = new ProductosDaoFirebase()
        carritosDao = new CarritoDaoFirebase()
        break
    case 'mongodb':
        const { default: ProductosDaoMongoDB } = await import('./Productos/Daos/ProductosDaoMongoDB.js')
        const { default: CarritoDaoMongoDB } = await import('./Carrito/Daos/CarritoDaoMongoDB.js')
        
        productosDao = new ProductosDaoMongoDB()
        carritosDao = new CarritoDaoMongoDB()
        break
    default:
        break;
}