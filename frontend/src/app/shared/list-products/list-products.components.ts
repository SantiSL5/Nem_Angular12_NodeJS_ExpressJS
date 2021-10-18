import { Component, Input, OnInit } from "@angular/core";
import { Product } from '../../core/models/product';
import { ProductService } from "../../core/services/product.service";

@Component({
    selector: 'app-list-products',
    templateUrl: './list-products.component.html',
    styleUrls: ['./list-products.component.css']
})

export class ListProductsComponent implements OnInit {

    listProducts: Product[] = [];

    constructor ( private _productService: ProductService) {};
    
    ngOnInit(): void {
        this.getAllProducts();
    }
    
    getAllProducts(): void {
        this._productService.getProducts().subscribe(data => {
            this.listProducts = data;
        }, (error: any) => {
            console.log(error);
        })
    }
}