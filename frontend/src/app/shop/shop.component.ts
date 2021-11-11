import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shop-page',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {
  currentRoute: String = "";
  details: Boolean = true;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.currentRoute = this.router.url;

    if (this.currentRoute.startsWith('/shop/product')) {
      this.details = true;
    } else {
      this.details = false;
    }

  }

}
