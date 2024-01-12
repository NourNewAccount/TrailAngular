import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TaskService } from '../task.service';
import { Task } from '../models/task';
import { CommonModule } from '@angular/common';
import { TaskSharedService } from '../task-shared.service';

@Component({
  selector: 'app-task-detail',
  standalone: true,
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.css'],
  imports: [CommonModule],
})
export class TaskDetailComponent implements OnInit {
  taskId: any;
  task: Task | undefined;

  constructor(
    private route: ActivatedRoute,
    private taskService: TaskService,
    private taskSharedService: TaskSharedService
  ) {}

  ngOnInit(): void {
    const taskId = this.taskSharedService.getTaskId();
    if (taskId) {
      this.loadTaskDetails(taskId);
    }
  }

  loadTaskDetails(taskId: number): void {
    this.taskService.getTaskById(taskId).subscribe({
      next: (task) => {
        this.task = task;
      },
      error: (error) => {
        console.error('Error loading task details', error);
      },
    });
  }
}
