import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Usuario } from '../model/usuario';
import { GLOBAL } from './global';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public url: string;
  public token: any;
  private authState = new BehaviorSubject<boolean>(this.getToken() !== null);
  public authState$ = this.authState.asObservable();
  constructor(private _http: HttpClient, private http: HttpClient) {
    this.url = GLOBAL.url;
  }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  login(usuario: any): Observable<Usuario> {
    let params = JSON.stringify(usuario);
    return this.http.post<Usuario>(this.url + 'api/v1/login', params, this.httpOptions);
  }

  getToken() {
    let token = localStorage.getItem('token');
    if (token != "undefined") {
      this.token = token;
    } else {
      this.token = null;
    }
    return this.token;
  }

  setAuthState(isLoggedIn: boolean) {
    this.authState.next(isLoggedIn);
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.setAuthState(false); 
  }

}
