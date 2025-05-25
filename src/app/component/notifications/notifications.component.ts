import { Component, Input, OnInit } from "@angular/core";
import { take } from "rxjs";
import {
  INotification,
  INotificationList,
} from "src/app/interfaces/notificationList";
import { ProductoService } from "src/app/service/producto.service";

@Component({
  selector: "app-notifications",
  templateUrl: "./notifications.component.html",
})
export class NotificationsComponent implements OnInit {
  
  @Input() closeModal!: () => void;

  public loading: boolean = true;
  public notification: INotification[] = [];

  constructor(private productService: ProductoService) {}

  ngOnInit(): void {
    this.getNotifications();
  }

  getNotifications(): void {
    this.loading = true;
    this.productService
      .getNotification()
      .pipe(take(1))
      .subscribe({
        next: (data: INotificationList) => {
          const { content } = data.productos;
          this.notification = content;
        },
        error: (err) => {
          console.error("Error al obtener las notificaciones", err);
          this.loading = false;
        },
        complete: () => {
          this.loading = false;
        },
      });
  }
}
