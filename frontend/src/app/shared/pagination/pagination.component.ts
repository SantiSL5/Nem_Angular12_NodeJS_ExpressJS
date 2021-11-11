import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {
  numpages: number = 0;
  actualpage: number = 1;
  pages: number[] = [];
  uphide: Boolean = false;
  downhide: Boolean = false;
  hide: Boolean = true;
  @Output() change_offset = new EventEmitter<number>();

  constructor() { }

  ngOnInit(){
  }

  
  setnumpages(numpages: number){
    console.log(numpages);
    this.numpages=numpages;
    this.pages=[];
    for (let i = 0; i < numpages; i++) {
      this.pages[i]=i+1;
    }
  }

  changepage(change: any) {
    if (change == "up") {
      if (this.actualpage + 1 >= 1 && this.actualpage + 1 <= this.numpages) {
        this.actualpage=this.actualpage+1;
      }
    }
    if (change == "down") {
      if (this.actualpage - 1 >= 1 && this.actualpage - 1 <= this.numpages) {
        this.actualpage=this.actualpage-1;
      }
    }
    if (typeof change === 'number') {
      if (change >= 1 && change <= this.numpages) {
        this.actualpage=change;
      }
    }

    console.log(this.actualpage);
    this.change_offset.emit(this.actualpage-1);
  }

}
