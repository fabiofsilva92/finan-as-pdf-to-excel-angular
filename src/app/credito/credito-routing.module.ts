import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CreditoComponent } from './credito/credito.component';

const routes: Routes = [
  { path: '', component: CreditoComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreditoRoutingModule { }
