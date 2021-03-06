import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Category } from 'src/app/core/models/category';
import { CategoryService } from 'src/app/core/services/category.service';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent implements OnInit {
  @Output() onCategoryChange = new EventEmitter<any>();
  @Output() onShipChange = new EventEmitter<any>();
  categoryfilt: String | undefined;
  shipfilt: Boolean | undefined;
  listCategories: Category[] = [];

  constructor(private _categoryService: CategoryService) {}

  ngOnInit(): void {
    this.getAllCategories();
  }

  getAllCategories(): void {
      this._categoryService.getAllCategories().subscribe((data: Category[]) => {
          this.listCategories = data;
      }, (error: any) => {
          console.log(error);
      })
  }

  categoryset(category:String|undefined) {
    this.categoryfilt=category;
    this.onCategoryChange.emit(this.categoryfilt);
  }

  shipset(ship:Boolean|undefined) {
    this.shipfilt=ship;
    this.onShipChange.emit(this.shipfilt);
  }

}
