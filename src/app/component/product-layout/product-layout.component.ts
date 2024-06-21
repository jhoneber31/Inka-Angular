import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { categorySeals, typesSeals } from 'src/app/core/typesProduct';
import { Content } from 'src/app/interfaces/productList';
import { ModalService } from 'src/app/service/modal.service';
import { ProductoService } from 'src/app/service/producto.service';

@Component({
  selector: 'app-product-layout',
  templateUrl: './product-layout.component.html',
})
export class ProductLayoutComponent implements OnInit {

  @Input()
  public product: Content | null = null;

  @Output() 
  public productUpdated: EventEmitter<void> = new EventEmitter<void>();

  public buttonText: string = 'Crear';
  public message: string = '';
  public form:FormGroup;
  public selectedFile: string | ArrayBuffer | null = null;
  public imageSelected: File | string | null = null;
  public loading: boolean = false;

  public typeSeal:any[] = typesSeals;
  public categorySeal:any[] = categorySeals;

  constructor(private productService:ProductoService, private formBuilder:FormBuilder, private modalService:ModalService) {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      dimension: ['', Validators.required],
      type: ['', Validators.required],
      category: ['', Validators.required],
      unitPrice: ['', [Validators.required, Validators.min(1), Validators.pattern('^[0-9]+(\.[0-9]+)?$')]],
      image: [null, [Validators.required, this.fileValidator()]],
    })
  }

  ngOnInit(): void {
    if(this.product?.id) {
      this.buttonText = 'Actualizar';
      this.getProduct();
    }
  }

  getProduct(): void {
    this.form.patchValue({
      name: this.product?.nombre,
      dimension: this.product?.medida,
      type: this.product?.tipoProducto.id,
      category: this.product?.categoriaProductos.id,
      unitPrice: this.product?.precio,
      image: this.product?.imagen
    })
    this.selectedFile = this.product!.imagen;
  }

  fileValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if(!this.product?.id) {
        const file = control.value;
        return file instanceof File ? null : { 'invalidFile': true };
      }
      return null;
    };
  }

  onFileChange(event: any):void {
    const inputFile = event.target as HTMLInputElement;
    if(inputFile.files && inputFile.files.length > 0) {
      const file = inputFile.files[0];
      this.imageSelected = inputFile.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.selectedFile = reader.result;
      }
      reader.readAsDataURL(file);
      this.form.patchValue({
        image: file
      })
      console.log(this.imageSelected);
    }
  }

  createURLimage(callback: () => void):void {
    if(this.imageSelected instanceof File ) {
      this.productService.uploadImage(this.imageSelected!)
      .subscribe({
        next: (response) => {
          if(response.imagenes_subidas && response.imagenes_subidas.length > 0) {
            this.form.patchValue({
              image: response.imagenes_subidas[0].url
            })
            console.log(this.form.value.image);
          }
        },
        error: err => console.error('Observable emitted an error: ' + err),
        complete: () => {
          callback();
          console.log('Observable emitted the complete notification')
        }
      })
    }
  }

  createProduct(data: Content):void {
    this.productService.createProduct(data)
    .subscribe({
      next: response => {
        this.message = response.message;
      },
      error: err => {
        this.message = err.error.message;
      },
      complete: () => {
        this.loading = false;
      }
    });
  }

  updateProduct(data:Content):void {
    this.productService.updateProduct(data)
    .subscribe({
      next: response => {
        this.message = response.message;
      },
      error: err => {
        this.message = err.error.message;
      },
      complete: () => {
        this.loading = false;
      }
    })
  }

  submitProduct(): void {
    this.loading = true;
    let data: Content = {
      nombre: this.form.value.name,
      medida: this.form.value.dimension,
      descripcion: 'description',
      precio: this.form.value.unitPrice,
      imagen: this.form.value.image,
      categoriaProductos: {
        id: this.form.value.category,
      },
      tipoProducto: {
        id: this.form.value.type,
      }
    };

    if(this.product?.id) {
      data.id = this.product.id;
      if (this.imageSelected instanceof File) {
        this.createURLimage(() => {
          data.imagen = this.form.value.image;
          this.updateProduct(data);
        });
      } else {
        this.updateProduct(data);
      }
    } else {
      this.createURLimage(() => {
        data.imagen = this.form.value.image;
        this.createProduct(data);
      })
    }
  }

  closeModal():void {
    this.modalService.closeModal();
  }
  updateChanges():void {
    this.closeModal();
    this.productUpdated.emit();
  }
}
