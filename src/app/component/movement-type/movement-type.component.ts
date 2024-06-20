import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Providers, listProviders } from 'src/app/core/lisProviders';
import { Content } from 'src/app/interfaces/productList';
import { ProductoService } from 'src/app/service/producto.service';

@Component({
  selector: 'app-movement-type',
  templateUrl: './movement-type.component.html',
})
export class MovementTypeComponent implements OnInit {
  @Input()
  public product:Content | null = null;

  @Output()
  public title = new EventEmitter<string>();

  public message: string = '';
  public typeMovement:number = 1;
  public allProviders:Providers[] = listProviders;
  public form: FormGroup;
  
  constructor(private producService:ProductoService, private formBuilder:FormBuilder) { 
    this.form = this.formBuilder.group({
      provider: ['', Validators.required],
      productId: ['', Validators.required],
      quantity: ['', [Validators.required, Validators.min(1), Validators.pattern('^[0-9]+')]],
      reason: ['', Validators.required],
      userId: ['', Validators.required],
    })
  }

  ngOnInit(): void {
    if (this.product && this.product.id) {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      this.form.patchValue({
        productId: this.product.id,
        userId: user.id
      });
    } else {
      console.warn("Product is null or does not have an id", this.product);
    }
  }
  
  selectMovementType(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const id = parseInt(selectElement.value, 10);

    if(id === 1) {
      this.typeMovement = 1;
      this.form.get('provider')?.setValidators(Validators.required);
      this.title.emit("Ingresar Producto");
    } else {
      this.typeMovement = 2;
      this.form.get('provider')?.clearValidators();
      this.title.emit("Retirar Producto");
    }
    this.form.get('provider')?.updateValueAndValidity();
  }

  handleSubmit(): void {
    let data:any = {
      tipo: {
        id: this.typeMovement,
      },
      producto: {
        id: this.product?.id
      },
      cantidad: Number(this.form.value.quantity),
      motivo: this.form.value.reason,
      usuario: {
        id: this.form.value.userId
      },
      nombre:"sello",
    }
  
    if(this.typeMovement === 1) {
      data = {
        ...data,
        proveedor: {
          id: this.form.value.provider
        }
      }
    }
  
    this.producService.registerMovement(data)
      .subscribe({
        next: response => {
          this.message = response.message;
        },
        error: err => console.error('Error occurred: ' + err),
        complete: () => console.log('Product update completed')
      })
  }
}
