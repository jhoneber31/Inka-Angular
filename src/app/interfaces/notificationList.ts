export interface INotificationList {
  productos: Productos;
}

export interface Productos {
  number: number;
  size: number;
  sort: Sort;
  totalPages: number;
  totalElements: number;
  content: INotification[];
}

export interface INotification {
  id: number;
  nombre: string;
  medida: string;
  descripcion: Descripcion;
  precio: number;
  stock: number;
  imagen: string;
  categoriaProductos: CategoriaProductos;
  tipoProducto: CategoriaProductos;
  colorProducto: null;
}

export interface CategoriaProductos {
  id: number;
  nombre: string;
}

export enum Descripcion {
  Descripcion = "descripcion",
}

export interface Sort {
  empty: boolean;
  unsorted: boolean;
  sorted: boolean;
}
