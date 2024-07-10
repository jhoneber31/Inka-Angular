import { Injectable } from '@angular/core';

import { Observable, catchError, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GLOBAL } from './global';
import {LoginService} from './login.service';
import { CreatedResponse, ProductList } from '../interfaces/productList';
import { SearchResponseImage } from '../interfaces/imageUrl';
import { HistoryList, ProviderQuantity } from '../interfaces/historyList';

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
  getMovementByProviders(): Observable<ProviderQuantity[]> {
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      "Authorization": "Bearer "+this.loginService.getToken(),
    });
    return this.http.get<ProviderQuantity[]>(this.url + 'api/movimientos/dashboard', {headers});
  }

  deleteProduct(data: any):Observable<CreatedResponse> {
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      "Authorization": "Bearer "+this.loginService.getToken(),

      });
    return this.http.post<CreatedResponse>(this.url + 'api/productos/eliminar', data ,{headers});
  }

  downloadReportPdf() {
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      "Authorization": "Bearer "+this.loginService.getToken(),
      });
      return this.http.get(this.url + "api/productos/pdf", {
        headers: headers,
        responseType: 'blob'
      });
  }

  downloadReportMovementPdf() {
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      "Authorization": "Bearer "+this.loginService.getToken(),
    });
    return this.http.get(this.url + "api/movimientos/pdf", {
      headers: headers,
      responseType: 'blob'
    });
  }

}
