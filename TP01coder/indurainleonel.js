class Usuario {
    constructor(nombre, apellido, libros, mascotas) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.libros = libros;
        this.mascotas = mascotas;
    }
    getFullName() {
        return `${this.nombre} ${this.apellido}`;
    }
    addMascotas(mascota) {
        this.mascotas.push(mascota);
    }
    countMasctotas() {
        return this.mascotas.length;
    }
    addBook(nombre, autor) {
        this.libros.push({
            nombre,
            autor
        });
    }
    getBookNames() {
        return this.libros.map(libro => libro.nombre);
    }
}
const usuario = new Usuario('Leonel', 'Indurain',
                             [
                              {nombre:'Cien años de soledad',autor:'Gabriel García Márquez'},
                              {nombre:'Un mundo feliz',autor:'Aldous Huxley'}, 
                              {nombre:'Orgullo y prejuicio',autor:'Jane Austen'}
                             ,{nombre:'El señor de los anillos',autor:'JRR Tolkien'},                            
                            ],
                             ['Gato', 'Ardilla','Perro']);
console.log('Contador de mascotas', usuario.countMasctotas());
console.log('Enlistar los libros',usuario.getBookNames())
usuario.addBook('Crimen y castigo','Fiódor Dostoyevski');
usuario.addBook('En busca del tiempo perdido','Marcel Proust');
console.log('Enlistar los libros agregados',usuario.getBookNames())
usuario.addMascotas('Iguana')
console.log('Contador de mascotas final', usuario.countMasctotas());
console.log('Nombre completo', usuario.getFullName());