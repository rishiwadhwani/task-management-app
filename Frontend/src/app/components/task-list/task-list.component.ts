import {
  Component,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { Task, TaskService } from '../../services/task/task.service';
import { AuthService } from '../../services/auth/auth.service';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
})
export class TaskListComponent implements OnInit, OnChanges {
  tasks: Task[] = [];
  filteredTasks: Task[] = [];
  @Input() filterStatus: string = 'All';
  displayedColumns: string[] = ['name', 'description', 'status', 'actions'];

  constructor(
    private taskService: TaskService,
    public authService: AuthService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['filterStatus']) {
      this.applyFilter(this.filterStatus);
    }
  }

  loadTasks(): void {
    this.taskService.getTasks().subscribe((tasks) => {
      this.tasks = tasks;
      this.applyFilter(this.filterStatus);
    });
  }

  applyFilter(filterStatus: string): void {
    if (filterStatus === 'All') {
      this.filteredTasks = this.tasks;
    } else {
      this.filteredTasks = this.tasks.filter(
        (task) => task.status === filterStatus
      );
    }
  }

  changeStatus(task: Task, status: Task['status']): void {
    this.taskService
      .updateTask(task._id, { status })
      .subscribe((updatedTask) => {
        task.status = updatedTask.status;
        this.applyFilter(this.filterStatus);
      });
  }

  deleteTask(id: string): void {
    this.taskService.deleteTask(id).subscribe(() => {
      this.tasks = this.tasks.filter((task) => task._id !== id);
      this.applyFilter(this.filterStatus);
    });
  }

  openDeleteDialog(task: Task): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '250px',
      data: { taskName: task.name }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteTask(task._id);
      }
    });
  }
}
