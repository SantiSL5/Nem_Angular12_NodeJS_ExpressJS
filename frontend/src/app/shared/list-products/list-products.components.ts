import { HttpClient, HttpParams } from "@angular/common/http";
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Subject } from "rxjs";
// import { Observable } from "rxjs";
// import { environment } from "src/environments/environment";
import { Product } from '../../core/models/product';
import { ProductService } from "../../core/services/product.service";
import { PaginationComponent } from "../pagination/pagination.component";

@Component({
    selector: 'app-list-products',
    templateUrl: './list-products.component.html',
    styleUrls: ['./list-products.component.css']
})

export class ListProductsComponent {

    @ViewChild(PaginationComponent)
    private pagcomponent: PaginationComponent = new PaginationComponent;

    category: String | undefined;
    search: String | undefined;
    shipping: Boolean | undefined;
    limit: number = 3;
    offset: number = 0;
    listProducts: Product[] = [];

    constructor(private _productService: ProductService, private route: ActivatedRoute) {}

    ngOnInit(): void {
        this.route.queryParams.subscribe(params => {
            this.category = params['category'];
            this.search = params['search'];
        });
        this.getProducts();
    }

    getProducts(): void {
        this._productService.getProducts(this).subscribe((data: any) => {
            this.listProducts= data.products;
            this.pagcomponent.setnumpages(Math.ceil(data.numproducts/this.limit));
        }, (error: any) => {
            console.log(error);
        })
    }

    changeOffset(offset: number): void {
        this.offset=offset;
        this.getProducts();
    }
}