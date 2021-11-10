import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './layout/header.component';
import { ListProductsComponent } from './list-products/list-products.components';
import { ListDetailsComponent } from './list-details/list-details.component';
import { FiltersComponent } from './filters/filters.component';
import { PaginationComponent } from './pagination/pagination.component';

@NgModule({
  declarations: [
    HeaderComponent,
    ListProductsComponent,
    ListDetailsComponent,
    FiltersComponent,
    PaginationComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule
  ],
  exports: [
    HeaderComponent,
    ListProductsComponent,
    ListDetailsComponent,
    FiltersComponent,
    PaginationComponent
  ]
})
export class SharedModule { }
