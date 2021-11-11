import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './layout/header.component';
import { ListProductsComponent } from './list-products/list-products.components';
import { ListDetailsComponent } from './list-details/list-details.component';
import { FiltersComponent } from './filters/filters.component';
import { PaginationComponent } from './pagination/pagination.component';
import { SearchComponent } from './search/search.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListErrorsComponent } from './list-errors/list-errors.component';
import { ShowAuthedDirective } from './show-authed.directive';

@NgModule({
  declarations: [
    HeaderComponent,
    ListProductsComponent,
    ListDetailsComponent,
    FiltersComponent,
    PaginationComponent,
    SearchComponent,
    ListErrorsComponent,
    ShowAuthedDirective
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    HeaderComponent,
    ListProductsComponent,
    ListDetailsComponent,
    FiltersComponent,
    PaginationComponent,
    SearchComponent,
    ListErrorsComponent
  ]
})
export class SharedModule { }
