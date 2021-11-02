import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/core/models/category';
import { CategoryService } from 'src/app/core/services/category.service';

@Component({
  selector: 'app-scroll',
  templateUrl: './scroll.component.html',
  styleUrls: ['./scroll.component.css']
})
export class ScrollComponent implements OnInit {
  listCategories: Category[] = [];
  limit: number = 2;
  offset: number = 0;

  constructor(private _categoriesService: CategoryService) { }

  ngOnInit(): void {
    this.getScroll();
  }

  getScroll(){
    this._categoriesService.getCategories(this.offset, this.limit).subscribe(data => {
      console.log(this.listCategories);
      this.listCategories.push.apply(this.listCategories, data);
      console.log(this.listCategories);
    }, error => {
      console.log(error);
    })
  }

  onScrollDown() {
    this.offset=this.offset+2;
    this.getScroll();
  }
}
