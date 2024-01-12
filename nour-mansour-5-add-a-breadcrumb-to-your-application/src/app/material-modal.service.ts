import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MaterialModalComponent } from '../app/shared/modal/material-modal/material-modal.component';

@Injectable({
  providedIn: 'root',
})
export class MaterialModalService {
  constructor(private dialog: MatDialog) {}

  openModal(content: any, taskId?: any) {
    this.dialog.open(MaterialModalComponent, {
      data: { content, taskId },
    });
  }
}
