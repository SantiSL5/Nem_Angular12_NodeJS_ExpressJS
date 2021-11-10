import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../core/models/product';

@Component({
  selector: 'app-shop-page',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {

  }

}
