import { Injectable } from '@angular/core';
import { HttpClient,HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class ProductService {

  constructor(private http: HttpClient) {}
    getProducts(data: any): Observable<any> {
      return this.http.get(environment.urlProduct, {params: {'limit':data.limit,'offset':data.offset,'cat':data.category,'search':data.search,'ship':data.shipping}});
    }

    getProduct(slug: String): Observable<any> {
      return this.http.get(environment.urlProduct + '/' + slug);
    }  
}