const Contenedor = require("./contenedor");

const contenedor = new Contenedor('productos.txt')

 contenedor.save({titulo: 'Casco H5', precio: 5000 , thumbnail : 'https://www.nexon.com.ar/media/catalog/product/cache/2/image/9df78eab33525d08d6e5fb8d27136e95/h/5/h5_2.jpg'});
// contenedor.save({titulo: 'Casco RS5', precio: 7000 , thumbnail : 'https://http2.mlstatic.com/D_NQ_NP_790592-MLA32941170171_112019-O.jpg'});
// contenedor.save({titulo: 'Casco RS11', precio: 10000 , thumbnail : 'https://http2.mlstatic.com/D_NQ_NP_678757-MLA47891037713_102021-O.webp'});

//contenedor.getById()

//contenedor.getAll()

//contenedor.deleteById()

//contenedor.deleteAll()

//contenedor.updateById()