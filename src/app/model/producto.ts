export class Producto{
    constructor(
        public nombre: string,
        public precio: any,
        public fecha?: any,
        public id?: number,
        public imagen?: any,
        public categoriaProductos?: any
    ) {}
    verDatos() {
        console.log ("Id: " + this.id + ", Nombre: " + this.nombre  + ", Precio: " + this.precio );
    }
 
}