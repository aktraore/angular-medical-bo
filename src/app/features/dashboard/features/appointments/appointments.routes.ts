import { Routes } from '@angular/router';

export const APPOINTMENTS_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => 
      import('./components/appointments-calendar.component').then(m => m.AppointmentsCalendarComponent)
  }
];