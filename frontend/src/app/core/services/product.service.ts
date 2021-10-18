import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class ProductService {

  constructor(private http: HttpClient) {}
    getProducts(): Observable<any> {
      console.log(this.http.get(environment.urlProduct))
      return this.http.get(environment.urlProduct);
    }

    getProduct(slug: string): Observable<any> {
      return this.http.get(environment.urlProduct + '/' + slug);
    }
  }