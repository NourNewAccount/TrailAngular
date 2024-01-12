import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Task } from '../models/task';
import { TaskService } from '../task.service';
import { TaskSharedService } from '../task-shared.service';

@Component({
  selector: 'app-task-update',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './task-update.component.html',
  styleUrls: ['./task-update.component.css'],
})
export class TaskUpdateComponent implements OnInit {
  taskId: number | string | any;
  task: Task = {
    id: '',
    title: '',
    description: '',
    deadline: '',
    isComplete: false,
  };

  constructor(
    // private route: ActivatedRoute,
    private router: Router,
    private taskService: TaskService,
    private taskSharedService: TaskSharedService
  ) {}

  ngOnInit(): void {
    const taskId = this.taskSharedService.getTaskId();
    if (taskId !== null) {
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

  updateTask(): void {
    const taskId = this.taskSharedService.getTaskId();
    if (taskId !== null) {
      this.taskService.updateTask(taskId, this.task).subscribe({
        next: () => {
          console.log('Task updated successfully');
          // this.router.navigate(['/tasks']);
        },
        error: (error) => {
          console.error('Error updating task', error);
        },
      });
    } else {
      console.error('TaskId is not available. Update failed.');
    }
  }
}
