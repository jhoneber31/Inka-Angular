import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Content } from 'src/app/interfaces/productList';

@Component({
  selector: 'app-choose-action',
  templateUrl: './choose-action.component.html',
})
export class ChooseActionComponent {
  @Input()
  public product:Content | null = null;

  @Output()
  public edit = new EventEmitter<Content>();
  @Output()
  public register = new EventEmitter<Content>();

  onEdit(): void {
    this.edit.emit(this.product!);
  }
  onRegister(): void {
    this.register.emit(this.product!);
  }

}
