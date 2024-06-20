import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ContentHistory } from 'src/app/interfaces/historyList';

@Component({
  selector: 'app-history-information',
  templateUrl: './history-information.component.html',
})
export class HistoryInformationComponent implements OnInit {
  @Input()
  public product:ContentHistory  | null = null;

  constructor() {}

  ngOnInit(): void {
    if(this.product) {
      console.log(this.product);
    }
  }
}
