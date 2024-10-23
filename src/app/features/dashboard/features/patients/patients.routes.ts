import { Routes } from '@angular/router';

export const PATIENTS_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => 
      import('./components/patients-list.component').then(m => m.PatientsListComponent)
  }
];