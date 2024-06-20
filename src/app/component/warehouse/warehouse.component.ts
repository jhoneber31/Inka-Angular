import { Component, OnDestroy, OnInit } from '@angular/core';
import { Categories, Content, ProductList } from 'src/app/interfaces/productList';
import { ProductoService } from 'src/app/service/producto.service';
import { Products } from '../../interfaces/productList';
import { ActivatedRoute, Router, ActivatedRouteSnapshot } from '@angular/router';
import { BehaviorSubject, Subscription, take } from 'rxjs';

@Component({
  selector: 'app-warehouse',
  templateUrl: './warehouse.component.html',
})

export class WarehouseComponent implements OnInit, OnDestroy {

  private pageSubject = new BehaviorSubject<number>(0);
  private $page: Subscription = new Subscription();

  public products: Content[] =[];
  public categories: Categories[] = [];
  public totalPages: number = 0;
  public showModal: boolean = false;
  public messageFromChild: string = "";
  public imagesProducts: string = "";
  public modalContent:string = '';
  public selectedProduct: Content | null= null;
  public loading: boolean = true;
  public searchQuery: string = '';
  public title:string = "";

  constructor(
    private router:Router,
    private productService:ProductoService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.setSuscritpion();
  }

  setSuscritpion(): void {
    this.checkQueryParams();
    this.$page = this.pageSubject.subscribe(page => {
      this.getProducts(page);
    })
  }

  checkQueryParams(): void {
    this.route.queryParams.subscribe(params => {
      console.log("el param page es:", params['page'])
      const page = +params['page'] || 0;
      this.setPage(page);
    });
  }

  getPage(): number {
    return this.pageSubject.getValue();
  }

  setPage(page: number): void {
    if( page < 0 || page >= this.totalPages) return;
    this.pageSubject.next(page)
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { page },
      queryParamsHandling: 'merge'
    });
  }

  getProducts(page:number): void {
    this.loading = true;
    this.productService.index(this.searchQuery,page).pipe(take(1))
      .subscribe({
        next: (data: ProductList) => {
          const {content} = data.productos;
          this.products = content;
          this.categories = data.categorias;
          this.totalPages = data.productos.totalPages;
        },
        error: err => console.error('Observable emitted an error: ' + err),
        complete: () => {
          this.loading = false;
        }
      });
  }
  
  searchProducts(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const query = inputElement.value;
    if(query === '') return;
    this.searchQuery = query;
    this.setPage(0);
  }

  openModal(content: string):void {
    this.modalContent = content;
    this.showModal = true;
    if(content === "newProduct") {
      this.title = "Crear Producto"
    }else if (content === "register-movement") {
      this.title = "Ingresar Producto";
    }
  }
  closeModal():void {
    this.showModal = false;
  }
  editProduct(product: Content):void {
    this.selectedProduct = product;
    this.title = "Editar Producto"
    this.openModal('edit-product');
  }
  registerMovement(product: Content):void {
    this.selectedProduct = product;
    this.openModal('register-movement');
  }
  updateTitle(newTitle:string):void {
    this.title = newTitle;
  }
  ngOnDestroy(): void {
    this.$page.unsubscribe();
  }

}
