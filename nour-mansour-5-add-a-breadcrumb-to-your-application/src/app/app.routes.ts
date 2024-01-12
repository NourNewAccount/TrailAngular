import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskCreateComponent } from './task-create/task-create.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthGuard } from './auth.guard';
import { SupportComponent } from './support/support.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // Redirect to home by default
  { path: 'tasks', component: TaskListComponent, canActivate: [AuthGuard] },

  {
    path: 'tasks',
    canActivate: [AuthGuard],
    children: [
      { path: '', component: TaskListComponent }, // Default route for 'tasks'
      { path: 'create', component: TaskCreateComponent },
    ],
  },

  { path: 'support', component: SupportComponent, canActivate: [AuthGuard] },

  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [],
})
export class AppRoutingModule {}
