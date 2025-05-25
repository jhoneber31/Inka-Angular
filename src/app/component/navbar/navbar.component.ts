import { Component, OnInit } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";
import { ListNavigation, listNavigation } from "src/app/core/listNavigation";
import { SidebarService } from "src/app/service/sidebar.service";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
})
export class NavbarComponent implements OnInit {
  public links: ListNavigation[] = listNavigation;
  public user: string = "";
  public currentRoute: string = "Almacén";
  public showModal: boolean = false;
  public title: string = "Notificaciones";

  constructor(
    private sidebarService: SidebarService,
    private router: Router,
  ) {}
  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    this.user = user.nombre || "";
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (event.urlAfterRedirects === "/history") {
          this.currentRoute = "Historial";
        } else {
          this.currentRoute = "Almacén";
        }
      }
    });

  }

  toggleSidebar(): void {
    this.sidebarService.toggleValue();
  }

  showNotificationModal(): void {
    this.showModal = true;
  }

  closeNotificationModal(): void {
    this.showModal = false;
  }
}
