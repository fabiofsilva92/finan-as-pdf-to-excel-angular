import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full' ,redirectTo: 'credito' },
  {
    path: 'credito',
    loadChildren: () => import('./credito/credito.module').then(m => m.CreditoModule)
  }
];
