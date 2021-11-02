import { Injectable } from '@angular/core';
import { HttpClient,HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class CategoryService {

  constructor(private http: HttpClient) {}
    
  getAllCategories(): Observable<any> {
    return this.http.get(environment.urlCategory);
  }

  getCategories(offset: number, limit: number): Observable<any> {
    let params = new HttpParams()
    .set('offset', offset)
    .set('limit', limit);

    return this.http.get(environment.urlCategory + '/scroll/', {params});
  }
}