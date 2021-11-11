import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/core/models/product';
import { ProductService } from "../../core/services/product.service";

@Component({
  selector: 'app-list-details',
  templateUrl: './list-details.component.html',
  styleUrls: ['./list-details.component.css']
})
export class ListDetailsComponent implements OnInit {
  productslug: String='';
  product!: Product;
  constructor(private _productService: ProductService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {

      this.productslug = String(params.get('slug'));
      console.log(this.productslug);
    })
    this.getProduct();
  }

  getProduct() {
    this._productService.getProduct(this.productslug).subscribe(data => {
      this.product=data;
      console.log(data);
    }, error => {
      console.log(error);
    })
  }
}
