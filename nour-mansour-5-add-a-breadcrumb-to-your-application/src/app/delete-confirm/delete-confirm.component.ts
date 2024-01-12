import { Component, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { TaskService } from '../task.service';
import { TaskSharedService } from '../task-shared.service';

@Component({
  selector: 'app-delete-confirm',
  standalone: true,
  templateUrl: './delete-confirm.component.html',
  styleUrls: ['./delete-confirm.component.css'],
})
export class DeleteConfirmComponent {
  title: string;
  message: string;

  constructor(
    private dialogRef: MatDialogRef<DeleteConfirmComponent>,
    private taskService: TaskService,
    private taskSharedService: TaskSharedService
  ) {
    this.title = 'Confirm Deletion';
    this.message = 'Are you sure you want to delete this task?';
  }

  confirm(): void {
    const taskId = this.taskSharedService.getTaskId();

    if (taskId !== null) {
      this.deleteTask(taskId);
    }
    this.dialogRef.close(true);
  }

  cancel(): void {
    this.dialogRef.close(false);
  }

  deleteTask(taskId: number): void {
    this.taskService.deleteTask(taskId).subscribe({
      next: () => {
        console.log('Task deleted successfully', taskId);
        location.reload();
      },
    });
  }
}
