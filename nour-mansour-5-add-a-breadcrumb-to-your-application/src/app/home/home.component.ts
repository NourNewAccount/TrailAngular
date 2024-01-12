import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { AuthComponent } from '../auth/auth.component';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { selectUserName } from '../auth/auth.selectors';
import { SidebarComponent } from '../shared/sidebar/sidebar.component';
import { Refresh } from '@ngrx/store-devtools/src/actions';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [AuthComponent, CommonModule, SidebarComponent],
})
export class HomeComponent implements OnInit {
  isAuthenticated$!: Observable<boolean>;
  username$!: Observable<string>;

  constructor(private authService: AuthService, private store: Store) {}

  ngOnInit(): void {
    this.isAuthenticated$ = this.authService.isAuthenticated();
    this.username$ = this.store.select(selectUserName);
  }

  logout(): void {
    this.authService.logout();
    // Refresh the page
    location.reload();
  }
}
