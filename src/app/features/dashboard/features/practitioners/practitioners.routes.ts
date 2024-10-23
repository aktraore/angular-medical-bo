import { Routes } from '@angular/router';

export const PRACTITIONERS_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => 
      import('./components/practitioners-list.component').then(m => m.PractitionersListComponent)
  }
];