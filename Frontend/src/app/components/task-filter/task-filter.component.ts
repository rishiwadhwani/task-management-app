import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-task-filter',
  templateUrl: './task-filter.component.html',
  styleUrls: ['./task-filter.component.scss']
})
export class TaskFilterComponent {
  @Output() filterChange = new EventEmitter<string>();
  filterStatus: string = 'All';

  onFilterChange(): void {
    this.filterChange.emit(this.filterStatus);
  }
}
