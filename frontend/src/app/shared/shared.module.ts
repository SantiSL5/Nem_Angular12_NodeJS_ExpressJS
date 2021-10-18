import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './layout/header.component';
import { ListProductsComponent } from './list-products/list-products.components';


@NgModule({
  declarations: [
    HeaderComponent,
    ListProductsComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule
  ],
  exports: [
    HeaderComponent,
    ListProductsComponent
  ]
})
export class SharedModule { }
