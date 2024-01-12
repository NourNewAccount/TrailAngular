import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { TaskSharedService } from '../../../task-shared.service';

interface MaterialModalData {
  content: any; // Component type
  taskId: number;
}

@Component({
  selector: 'app-material-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './material-modal.component.html',
  styleUrls: ['./material-modal.component.css'],
})
export class MaterialModalComponent {
  taskId: number | null = null;

  constructor(
    private dialogRef: MatDialogRef<MaterialModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: MaterialModalData,
    private taskSharedService: TaskSharedService
  ) {}

  ngOnInit(): void {
    this.taskSharedService.setTaskId(this.data.taskId);
  }

  close(): void {
    this.dialogRef.close();
  }
}
