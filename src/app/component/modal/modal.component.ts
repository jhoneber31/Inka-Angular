import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
})
export class ModalComponent {

  @Output()
  public closeModal = new EventEmitter<void>();

  @Input()
  public title:string = "";

  close():void{
    this.closeModal.emit();
  }
}
