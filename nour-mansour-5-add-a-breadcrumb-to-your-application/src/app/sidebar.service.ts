import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  expanded: boolean = true;
  sidebarWidth: number = 14;
  remianWidth: number = 85;
  showTasksMenu: boolean = false;

  constructor(private router: Router) {}

  toggleSidebarWidth() {
    this.expanded = !this.expanded;
    this.sidebarWidth = this.expanded ? 14 : 5;
    this.remianWidth = this.remianWidth === 85 ? 94 : 85;
  }

  navigateTo(route: string) {
    this.router.navigateByUrl(route);
  }

  toggleTasksMenu() {
    this.showTasksMenu = !this.showTasksMenu;
  }
}
