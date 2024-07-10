import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../service/login.service';
import { Router } from '@angular/router';
import { Usuario } from './../../model/usuario';
import { throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public login: Usuario;
  public alerta: boolean;
  public loading:boolean = false;

  constructor(private router: Router, private loginService: LoginService) {
    this.login = new Usuario('esaul@gmail.com', '12345678', '');
    this.alerta = false;
  }
  ngOnInit(): void {
    if (this.loginService.getToken()) {
      this.router.navigate(['warehouse']);
    }
  }

  iniciarSesion(model: Usuario, isValid: any) {
    this.alerta = false;
    this.loading =true;
    if (isValid === true) {
      try {
        this.loginService.login(model).pipe(retry(1), catchError(this.handleError)).subscribe({
          next: (data) => {
            console.log(data)
            localStorage.setItem('token', data.accessToken);
            localStorage.setItem('user', JSON.stringify(data));
            this.loginService.setAuthState(true);

          },
          error: () => {
            console.log('ERROR DESDE SUBSCRIBE');
            this.alerta = true;
          },
          complete: () => {
            this.router.navigate(['warehouse']);
            this.loading = false;
            console.log('Completado');
          }
        });
      } catch (err) {
        console.log('ERROR DESDE CATCH');
      }
    } else {
      this.alerta = false;
    }
  }

  handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `CODIGO DE ERROR: ${error.status}\nMENSAJE: ${error.message}`;
    }
    console.log(errorMessage)
    return throwError(() => {
      return errorMessage;
    });
  }
}
