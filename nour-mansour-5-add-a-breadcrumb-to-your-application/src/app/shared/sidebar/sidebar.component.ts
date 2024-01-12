import { CommonModule } from '@angular/common';
import { Component, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { SidebarService } from '../../sidebar.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
  imports: [CommonModule],
})
export class SidebarComponent {
  @Output() toggleSidebar = new EventEmitter<void>();

  constructor(private sidebarService: SidebarService) {}

  get expanded(): boolean {
    return this.sidebarService.expanded;
  }

  get sidebarWidth(): number {
    return this.sidebarService.sidebarWidth;
  }

  get remianWidth(): number {
    return this.sidebarService.remianWidth;
  }

  get showTasksMenu(): boolean {
    return this.sidebarService.showTasksMenu;
  }

  toggleSidebarWidth() {
    this.sidebarService.toggleSidebarWidth();
  }

  navigateTo(route: string) {
    this.sidebarService.navigateTo(route);
  }

  toggleTasksMenu() {
    this.sidebarService.toggleTasksMenu();
  }
}
