import { HttpClient, HttpParams } from "@angular/common/http";
import { Component, Input, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Product } from '../../core/models/product';
import { ProductService } from "../../core/services/product.service";

@Component({
    selector: 'app-list-products',
    templateUrl: './list-products.component.html',
    styleUrls: ['./list-products.component.css']
})

export class ListProductsComponent {

    listProducts: Product[] = [];
    ProductService: any;

    constructor(private _productService: ProductService ,private http: HttpClient) {}
    
    ngOnInit(): void {
        this.getAllProducts();
    }
    
    // getAllProducts(offset: number, limit: number, categ: string, search: string, filtering: boolean, filters: {}): Observable<any> {
      
    //     let params = new HttpParams({fromObject: filters})
    //     .set('offset', offset)
    //     .set('limit', limit)
    //     .set('category', categ)
    //     .set('search', search)
    //     .set('filtering', filtering);
  
    //     return this.http.get(environment.urlProduct, {params});
    // }

    getAllProducts(): void {
        let httpParams = new HttpParams();
        httpParams.set("shipping", true);
        this._productService.getProducts(httpParams).subscribe((data: Product[]) => {
            this.listProducts = data;
            console.log(this.listProducts);
        }, (error: any) => {
            console.log(error);
        })
    }
}