import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TaskFormComponent } from '../task-form/task-form.component';
import { AuthService } from '../../services/auth/auth.service';
import { TaskListComponent } from '../task-list/task-list.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  filterStatus: string = 'All';
  @ViewChild(TaskListComponent) taskListComponent!: TaskListComponent;
  userEmail = '';
  userType= '';

  constructor(public dialog: MatDialog, public authService: AuthService) {}

  ngOnInit(): void {
    this.userEmail = this.authService.getUserEmail();
    this.userType = this.authService.getUserType();
  }

  applyFilter(filterStatus: string): void {
    this.filterStatus = filterStatus;
  }

  openAddTaskModal(): void {
    const dialogRef = this.dialog.open(TaskFormComponent, {
      width: '50vw'
    });

    dialogRef.componentInstance.taskAdded.subscribe(() => {
      this.taskListComponent.loadTasks(); // Reload tasks when a new task is added
    });
  }
}
