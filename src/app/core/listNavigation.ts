export interface ListNavigation {
  path: string;
  title: string;
  image: string;
  imageFocus: string;
}

export const listNavigation: ListNavigation[] = [
  {
    path: 'warehouse',
    title: 'Almacen',
    image: '/assets/img/warehouse-icon.svg',
    imageFocus: '/assets/img/warehouse-focus-icon.svg'
  },
  {
    path: 'history',
    title: 'Historial',
    image: '/assets/img/history-icon.svg',
    imageFocus: '/assets/img/history-focus-icon.svg'
  }
]