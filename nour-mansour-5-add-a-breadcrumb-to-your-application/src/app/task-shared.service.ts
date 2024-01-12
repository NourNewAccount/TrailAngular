import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TaskSharedService {
  private taskId: number | null = null;

  setTaskId(taskId: number): void {
    this.taskId = taskId;
    console.log('setted');
  }

  getTaskId(): number | null {
    return this.taskId;
  }
}
