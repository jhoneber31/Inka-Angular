export interface ProductList {
  categorias: Categories[];
  productos:  Products;
}

export interface Categories {
  id:     number;
  nombre: string;
  url:    null;
}

export interface Products {
  number:        number;
  size:          number;
  sort:          Sort;
  totalPages:    number;
  totalElements: number;
  content:       Content[];
}

export interface Content {
  id?:                 number;
  nombre:             string;
  medida:             string;
  descripcion:        string;
  precio:             number;
  stock?:              number;
  imagen:             string;
  categoriaProductos: CategoriesProducts;
  tipoProducto:       CategoriesProducts;
}

export interface CategoriesProducts {
  id:     number;
  nombre?: Nombre;
}

export enum Nombre {
  Cuadrangular = "cuadrangular",
  SelloAutomatico = "Sello Automatico",
}

export interface Sort {
  empty:    boolean;
  sorted:   boolean;
  unsorted: boolean;
}

export interface CreatedResponse {
  timestamp: string;
  status:    string;
  message:   string;
  errors:    string[];
}
