import { Routes } from '@angular/router';

export const DASHBOARD_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => 
      import('./components/dashboard.component').then(m => m.DashboardComponent),
    children: [
      {
        path: 'appointments',
        loadChildren: () => 
          import('./features/appointments/appointments.routes').then(m => m.APPOINTMENTS_ROUTES)
      },
      {
        path: 'patients',
        loadChildren: () => 
          import('./features/patients/patients.routes').then(m => m.PATIENTS_ROUTES)
      },
      {
        path: 'practitioners',
        loadChildren: () => 
          import('./features/practitioners/practitioners.routes').then(m => m.PRACTITIONERS_ROUTES)
      },
      {
        path: 'establishments',
        loadChildren: () => 
          import('./features/establishments/establishments.routes').then(m => m.ESTABLISHMENTS_ROUTES)
      },
      {
        path: 'settings',
        loadChildren: () => 
          import('./features/settings/settings.routes').then(m => m.SETTINGS_ROUTES)
      },
      {
        path: '',
        redirectTo: 'appointments',
        pathMatch: 'full'
      }
    ]
  }
];