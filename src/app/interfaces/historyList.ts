export interface HistoryList {
  movimientos: Movimientos;
}

export interface Movimientos {
  number:        number;
  size:          number;
  sort:          Sort;
  totalPages:    number;
  totalElements: number;
  content:       ContentHistory[];
}

export interface ContentHistory {
  id:       number;
  nombre:   string;
  cantidad: string;
  motivo:   null | string;
  fecha:    Date | null;
  usuario:  Usuario | null;
  provedor: Provedor;
  producto: Producto | null;
  tipo:     Tipo;
}

export interface Producto {
  id:                 number;
  nombre:             string;
  medida:             string;
  descripcion:        string;
  precio:             number;
  stock:              number;
  imagen:             string;
  categoriaProductos: Tipo;
  tipoProducto:       Tipo;
  colorProducto:      null;
}

export interface Tipo {
  id:     number;
  nombre: Nombre;
}

export enum Nombre {
  Activo = "activo",
  Cuadrangular = "Cuadrangular",
  Entrada = "Entrada",
  RoleAdmin = "ROLE_ADMIN",
  SelloAutomatico = "Sello Automatico",
}

export interface Provedor {
  id:     number;
  nombre: string;
  ruc:    string;
}

export interface Usuario {
  id:            number;
  correo:        string;
  roles:         Tipo[];
  estado:        Tipo;
  perfilUsuario: PerfilUsuario;
}

export interface PerfilUsuario {
  id:        number;
  nombres:   string;
  apellidos: string;
  telefono:  string;
}

export interface Sort {
  empty:    boolean;
  sorted:   boolean;
  unsorted: boolean;
}
