import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { BreadcrumbService } from './breadcrumb.service';

@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  imports: [CommonModule, BreadcrumbModule],
  templateUrl: './breadcrumb.component.html',
  styleUrl: './breadcrumb.component.css',
})
export class BreadcrumbComponent {
  items: MenuItem[] = [];

  constructor(private breadcrumbService: BreadcrumbService) {}

  ngOnInit() {
    // this.items = [
    //   { label: 'Home', routerLink: '/home' },
    //   {
    //     label: 'Tasks',
    //     routerLink: '/tasks',
    //     items: [
    //       { label: 'Task List', routerLink: '/tasks' },
    //       { label: 'Create Task', routerLink: '/tasks/create' },
    //     ],
    //   },
    //   { label: 'Support', routerLink: '/support' },
    // ];

    this.breadcrumbService.breadcrumb$.subscribe((breadcrumb) => {
      breadcrumb[0].icon = 'pi pi-home';
      this.items = breadcrumb;
    });
  }
}
