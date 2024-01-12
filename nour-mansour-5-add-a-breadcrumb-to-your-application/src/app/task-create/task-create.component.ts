import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Task } from '../models/task';
import { UuidService } from '../uuid.service';
import { TaskService } from '../task.service';
import { Observable } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-task-create',
  imports: [FormsModule],
  templateUrl: './task-create.component.html',
  styleUrls: ['./task-create.component.css'],
})
export class TaskCreateComponent {
  newTask: Task = {
    id: '',
    title: '',
    description: '',
    deadline: '',
    isComplete: false,
  };

  tasks: Task[] = [];
  constructor(
    private router: Router,
    private uuidService: UuidService,
    private taskService: TaskService
  ) {}

  createTask(): void {
    const taskId = this.uuidService.generateUniqueId();

    const task: Task = {
      id: taskId,
      title: this.newTask.title,
      description: this.newTask.description,
      deadline: this.newTask.deadline,
      isComplete: false,
    };

    this.taskService.createTask(task).subscribe({
      next: (response) => {
        // Handle the response if needed
        console.log('Task created successfully');
        this.router.navigate(['/tasks']);
      },
      error: (error) => {
        // Handle errors
        console.error('Error creating task', error);
        // Pushing the task locally
        // this.tasks.push(task);
      },
    });

    // Task created successfully, navigate to the task list
    console.log('Task created successfully');
    this.router.navigate(['/tasks']);
  }
}
