import { Injectable } from '@angular/core';

import { Observable, catchError, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Producto } from '../model/producto';
import { Paginate } from '../model/paginate';
import { GLOBAL } from './global';
import {LoginService} from './login.service';
import { CreatedResponse, ProductList } from '../interfaces/productList';
import { SearchResponseImage } from '../interfaces/imageUrl';
import { HistoryList } from '../interfaces/historyList';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  public url: string;
  public token: any;
  constructor(private http: HttpClient, private loginService:LoginService) {
    this.url = GLOBAL.url;
  }

  index(name:string, page:number): Observable<ProductList> {
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      "Authorization": "Bearer "+this.loginService.getToken(),
    });
    return this.http.get<ProductList>(this.url + `api/productos/listar?nombre=${name}&page=${page}`,{headers})
  }

  crear(producto: any,tipo:any): Observable<Producto> {
    let headers = new HttpHeaders({
      "Authorization": "Bearer "+this.loginService.getToken(),
      });

      if(tipo == 1){
        return this.http.post<Producto>(this.url + 'api/productos/productos', producto ,{headers});
      }else{
        return this.http.post<Producto>(this.url + 'api/productos/productos-imagen', producto ,{headers});
      }
  }

  createProduct(data:any):Observable<CreatedResponse>  {
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      "Authorization": "Bearer "+this.loginService.getToken(),
    });
    return this.http.post<CreatedResponse>(this.url + 'api/productos/productos', data ,{headers});
  }

  updateProduct(data:any):Observable<CreatedResponse> {
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      "Authorization": "Bearer "+this.loginService.getToken(),
    });
    return this.http.put<CreatedResponse>(this.url + 'api/productos/productos', data ,{headers});
  }

  uploadImage(file:File): Observable<SearchResponseImage> {
    const formData = new FormData();
    formData.append('desing', file);
    return this.http.post<SearchResponseImage>('https://inkaback-production-c8bb.up.railway.app/sales/design', formData )
  }

  registerMovement(data:any): Observable<CreatedResponse> {
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      "Authorization": "Bearer "+this.loginService.getToken(),
    });
    return this.http.post<CreatedResponse>(this.url + 'api/movimientos/movimiento', data ,{headers});
  }

  listHistory(page:number, dateFrom:string, dateTo:string): Observable<HistoryList> {
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      "Authorization": "Bearer "+this.loginService.getToken(),
    });
    return this.http.get<HistoryList>(this.url + `api/movimientos/listar?page=${page}&dateFrom=${dateFrom}&dateTo=${dateTo}`,{headers})
  }

  actualizar(producto: any, tipo: any): Observable<Producto> {
    let headers = new HttpHeaders({
      "Authorization": "Bearer "+this.loginService.getToken(),

      });
      if(tipo == 1){
        return this.http.put<Producto>(this.url + 'api/productos/productos', producto ,{headers});
      }else{
        return this.http.put<Producto>(this.url + 'api/productos/productos-imagen', producto ,{headers});
      }
      
  }
  eliminar(producto: any) {
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      "Authorization": "Bearer "+this.loginService.getToken(),

      });
    return this.http.post(this.url + 'api/productos/eliminar', producto ,{headers});
  }

}
