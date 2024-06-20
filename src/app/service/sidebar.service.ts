import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class SidebarService {
  private showSidebar = new BehaviorSubject<boolean>(false);
  public showSidebar$ = this.showSidebar.asObservable();

  toggleValue() {
    this.showSidebar.next(!this.showSidebar.value);
  }
}