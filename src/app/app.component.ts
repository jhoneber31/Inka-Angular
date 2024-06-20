import { Component, OnInit } from '@angular/core';
import { LoginService } from './service/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'my-project-two';
  public isLogged:boolean = false;

  constructor(private loginService: LoginService) { }

  ngOnInit(): void {
    this.loginService.authState$.subscribe((isLoggedIn: boolean) => {
      this.isLogged = isLoggedIn;
    })
  }
}
