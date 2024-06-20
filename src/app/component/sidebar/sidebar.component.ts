import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ListNavigation, listNavigation } from 'src/app/core/listNavigation';
import { LoginService } from 'src/app/service/login.service';
import { SidebarService } from 'src/app/service/sidebar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent implements OnInit{
  public showSidebar: boolean = false;
  public paths: ListNavigation[] = listNavigation;

  constructor(private router: Router, private sidebarService: SidebarService, private loginService: LoginService) { 
  }

  ngOnInit(): void {
    this.sidebarService.showSidebar$.subscribe(value => {
      this.showSidebar = value;
    })
  }
  toggleSidebar():void {
    this.sidebarService.toggleValue();
  }

  logoutSession():void {
    this.loginService.logout();
    this.router.navigate(['/login']);
    this.toggleSidebar();
  }
}
