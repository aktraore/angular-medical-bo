import { Routes } from '@angular/router';

export const SETTINGS_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => 
      import('./components/settings.component').then(m => m.SettingsComponent)
  },
  {
    path: 'profile',
    loadComponent: () => 
      import('./components/profile-settings.component').then(m => m.ProfileSettingsComponent)
  }
];