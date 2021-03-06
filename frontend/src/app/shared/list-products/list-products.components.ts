import { HttpClient, HttpParams } from "@angular/common/http";
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from "@angular/core";
import { ActivatedRoute, NavigationEnd, NavigationStart, Router } from "@angular/router";
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
    isProducts: Boolean = true;

    constructor(private _productService: ProductService, private route: ActivatedRoute, private router: Router) {
        router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
                this.route.queryParams.subscribe(params => {
                    if (params['category'] == '') {
                        this.category = undefined;
                    }else {
                        this.category = params['category'];
                    }
                    if (params['search'] == '') {
                        this.search = undefined;
                    }else {
                        this.search = params['search'];
                    }
                });
                this.getProducts();
            }
        });
    }

    ngOnInit(): void {
        this.route.queryParams.subscribe(params => {
            if (params['category'] == '') {
                this.category = undefined;
            }else {
                this.category = params['category'];
            }
            if (params['search'] == '') {
                this.search = undefined;
            }else {
                this.search = params['search'];
            }
        });
        this.getProducts();
    }

    getProducts(): void {
        this._productService.getProducts(this).subscribe((data: any) => {
            if (data.numproducts==0) {
                this.pagcomponent.hide=true;
                this.isProducts=false;
            }else {
                this.pagcomponent.hide=false;
                this.isProducts=true;
                this.listProducts= data.products;
                this.pagcomponent.setnumpages(Math.ceil(data.numproducts/this.limit));
            }
        }, (error: any) => {
            console.log(error);
        })
    }

    details(product:String) {
        this.router.navigate(['/shop/product/'+product])
    }

    changeOffset(offset: number): void {
        this.offset=offset;
        this.getProducts();
    }

    categoryFilt(category:String|undefined) {
        this.offset=0;
        this.category=category;
        this.getProducts();
    }

    shipFilt(ship:Boolean|undefined) {
        this.offset=0;
        this.shipping=ship;
        this.getProducts();
    }
}