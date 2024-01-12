import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { NavbarComponent } from './shared/navbar/navbar/navbar.component';
import { HttpClientModule } from '@angular/common/http';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { SidebarService } from './sidebar.service';
import { BreadcrumbComponent } from './shared/breadcrumb/breadcrumb.component';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { AuthComponent } from './auth/auth.component';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [],
  imports: [
    CommonModule,
    RouterModule,
    AppRoutingModule,
    NavbarComponent,
    HttpClientModule,
    SidebarComponent,
    BreadcrumbComponent,
    BreadcrumbModule,
    AuthComponent,
  ],
})
export class AppComponent {
  isAuthenticated$!: Observable<boolean>;

  constructor(
    public sidebarService: SidebarService,
    private authService: AuthService,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.isAuthenticated$ = this.authService.isAuthenticated();
  }

  toggleSidebarWidth() {
    this.sidebarService.toggleSidebarWidth();
  }

  title = 'my-first-project';
}
