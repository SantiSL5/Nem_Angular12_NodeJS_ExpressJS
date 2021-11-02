import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../core/models/product';

@Component({
  selector: 'app-shop-page',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {

  category: String= '';
  search: String= '';
  shipping: any= '';
  listProducts: Product[] = [];
  numpages: number = 0;
  currentPage: number = 0;
  limit: number = 3;
  offset: number = 0;

  constructor(
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.category = params['category'];
      this.search = params['search'];
    });
  }

}
