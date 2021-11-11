import { Component, Input, ChangeDetectionStrategy, OnChanges } from '@angular/core';


@Component({
  selector: 'app-list-errors',
  templateUrl: './list-errors.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListErrorsComponent implements OnChanges {
  formattedErrors: Array<string> = [];
  errorList: any;

  @Input() errors: Array<string> = [];
  
  ngOnChanges() {
    this.formatErrors();
  }

  formatErrors() {
    this.errorList = [this.errors];
  }


  trackByFn(index: any, item: any) {
    return index;
  }
}