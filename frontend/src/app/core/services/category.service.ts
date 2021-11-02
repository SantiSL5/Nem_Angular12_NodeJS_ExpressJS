import { Injectable } from '@angular/core';
import { HttpClient,HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class CategoryService {

  constructor(private http: HttpClient) {}
    
  getCategories(): Observable<any> {
    return this.http.get(environment.urlCategory);
  }
}