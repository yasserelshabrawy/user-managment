import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent {
  text: string = '';
  constructor() {}
  @Output('search') newItemEvent = new EventEmitter<string>();
  search(value: string) {
    this.newItemEvent.emit(value)
  }
}
