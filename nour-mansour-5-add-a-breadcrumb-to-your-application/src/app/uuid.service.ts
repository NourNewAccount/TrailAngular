import { Injectable } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root',
})
export class UuidService {
  generateUniqueId(): string {
    // Generate a unique ID using uuid
    return uuidv4();
  }
}