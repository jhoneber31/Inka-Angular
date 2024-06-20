export interface SearchResponseImage {
  status:           string;
  imagenes_subidas: ImagenesSubida[];
}

export interface ImagenesSubida {
  nombre_archivo: string;
  url:            string;
}
