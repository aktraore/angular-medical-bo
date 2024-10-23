import { Routes } from '@angular/router';

export const ESTABLISHMENTS_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => 
      import('./components/establishments-list.component').then(m => m.EstablishmentsListComponent)
  }
];