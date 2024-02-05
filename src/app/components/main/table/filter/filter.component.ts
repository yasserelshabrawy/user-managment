import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
  providers: [DatePipe],
})
export class FilterComponent implements OnInit {
  roles: any;
  selectedFilter: string = '';
  constructor(private userService: UserService, private datePipe: DatePipe) {}
  @Output('filterRole') newItemEvent = new EventEmitter<string>();
  @Output('filterDate') newItemEvent2 = new EventEmitter<string>();
  @Output('selectDate') newItemEvent3 = new EventEmitter<string>();
  ngOnInit(): void {
    this.getRoles();
  }

  getRoles() {
    this.userService.getRoles().subscribe((res) => {
      this.roles = res;
    });
  }

  filterRole(value: string) {
    this.newItemEvent.emit(value);
  }

  filterDate(value: string) {
    const date: any = this.datePipe.transform(value, 'MM/dd/yyyy');
    this.newItemEvent2.emit(date);
  }
  
  selectDate(){
    this.newItemEvent3.emit(this.selectedFilter);
  }
}
