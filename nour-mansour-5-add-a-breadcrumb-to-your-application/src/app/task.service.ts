// task.service.ts
import { Component, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from './models/task';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private apiUrl = 'https://65797046f08799dc8046f47a.mockapi.io/task'; // Replace with actual API endpoint

  constructor(private http: HttpClient) {}

  getTasks(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getTaskById(taskId: number | string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${taskId}`);
  }

  createTask(task: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, task);
  }

  updateTask(taskId: number | string, updatedTask: Task): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${taskId}`, updatedTask);
  }

  deleteTask(taskId: number | string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${taskId}`);
  }
}
