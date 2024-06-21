import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Content } from 'src/app/interfaces/productList';
import { ModalService } from 'src/app/service/modal.service';
import { ProductoService } from 'src/app/service/producto.service';

@Component({
  selector: 'app-delete-product',
  templateUrl: './delete-product.component.html',
})
export class DeleteProductComponent implements OnInit {

  @Input()
  public product: Content | null = null;

  @Output()
  public productDeleted: EventEmitter<void> = new EventEmitter<void>();

  public message: string = '';
  public loading: boolean = false;

  constructor(private modalService: ModalService, private productService: ProductoService) { }

  ngOnInit(): void {
  }

  closeModal():void {
    this.modalService.closeModal();
  }

  deleteProduct(): void {
    this.loading = true;
    const data = {
      id: this.product?.id
    }
    this.productService.deleteProduct(data)
      .subscribe({
        next: (data) => {
          this.message = data.message;
        },
        error: (err) => {
          this.message = err.error.message;
        },
        complete: () => {
          this.loading = false;
        }
      })
  }

  deletetedProduct(): void {
    this.closeModal();
    this.productDeleted.emit();
  }

}
