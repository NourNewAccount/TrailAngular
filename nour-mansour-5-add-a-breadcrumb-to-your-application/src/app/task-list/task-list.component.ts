import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TaskService } from '../task.service';
import { Observable } from 'rxjs';
import { Task } from '../models/task';
import { CommonModule } from '@angular/common';
import { MaterialModalService } from '../../app/material-modal.service';
import { TaskUpdateComponent } from '../task-update/task-update.component';
import { TaskCreateComponent } from '../task-create/task-create.component';
import { DeleteConfirmComponent } from '../delete-confirm/delete-confirm.component';
import { MatIconModule } from '@angular/material/icon';
import { TaskDetailComponent } from '../task-detail/task-detail.component';

@Component({
  selector: 'app-task-list',
  standalone: true,
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
  imports: [CommonModule, TaskUpdateComponent, MatIconModule],
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];

  constructor(
    private taskService: TaskService,
    private router: Router,
    private materialModalService: MaterialModalService
  ) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.taskService.getTasks().subscribe({
      next: (tasks: Task[]) => {
        this.tasks = tasks;
      },
      error: (error) => {
        console.error('Error loading tasks:', error);
        // Handle the error by loading local data
        this.loadLocalData();
      },
    });
  }

  loadLocalData(): void {
    // Define a local fallback data here
    const localData: Task[] = [
      {
        id: 1,
        title: 'Local Task 1',
        description: 'Description for Local Task 1',
        deadline: '2023-12-31',
        isComplete: false,
      },
      {
        id: 2,
        title: 'Local Task 2',
        description: 'Description for Local Task 2',
        deadline: '2023-12-31',
        isComplete: true,
      },
    ];

    this.tasks = localData;
  }

  openCreateModal(): void {
    const content = TaskCreateComponent;
    this.materialModalService.openModal(content);
  }

  openUpdateModal(taskId: number): void {
    const content = TaskUpdateComponent;
    const id = taskId;
    this.materialModalService.openModal(content, id);
  }

  openViewModal(taskId: number): void {
    const content = TaskDetailComponent;
    const id = taskId;
    this.materialModalService.openModal(content, id);
  }

  openApproveDeleteModal(taskId: number): void {
    const id = taskId;
    const content = DeleteConfirmComponent;
    this.materialModalService.openModal(content, id);
  }
}
