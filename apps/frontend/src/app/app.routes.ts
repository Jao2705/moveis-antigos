import { Routes } from '@angular/router';
import { authGuard } from './core/auth.guard';
import { adminGuard } from './core/admin.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./features/auth/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./features/auth/register.component').then((m) => m.RegisterComponent),
  },
  {
    path: '',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./layout/shell.component').then((m) => m.ShellComponent),
    children: [
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./features/dashboard/dashboard.component').then(
            (m) => m.DashboardComponent,
          ),
      },
      {
        path: 'atelie',
        loadComponent: () =>
          import('./features/atelie/atelie-list.component').then(
            (m) => m.AtelieListComponent,
          ),
      },
      {
        path: 'atelie/novo',
        loadComponent: () =>
          import('./features/atelie/atelie-form.component').then(
            (m) => m.AtelieFormComponent,
          ),
      },
      {
        path: 'atelie/editar/:id',
        loadComponent: () =>
          import('./features/atelie/atelie-form.component').then(
            (m) => m.AtelieFormComponent,
          ),
      },
      {
        path: 'movel',
        loadComponent: () =>
          import('./features/movel/movel-list.component').then(
            (m) => m.MovelListComponent,
          ),
      },
      {
        path: 'movel/novo',
        loadComponent: () =>
          import('./features/movel/movel-form.component').then(
            (m) => m.MovelFormComponent,
          ),
      },
      {
        path: 'movel/editar/:id',
        loadComponent: () =>
          import('./features/movel/movel-form.component').then(
            (m) => m.MovelFormComponent,
          ),
      },
      {
        path: 'admin/users',
        canActivate: [adminGuard],
        loadComponent: () =>
          import('./features/admin/users-list.component').then(
            (m) => m.UsersListComponent,
          ),
      },
      { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
    ],
  },
  { path: '**', redirectTo: 'dashboard' },
];
