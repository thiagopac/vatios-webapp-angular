import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WizardComponent } from './wizard/wizard.component';
import { BillPayComponent } from './bill-pay.component';

const routes: Routes = [
  {
    path: '',
    component: BillPayComponent,
    children: [
      {
        path: '',
        component: WizardComponent,
      },
      { path: '', redirectTo: 'otherpage', pathMatch: 'full' },
      { path: '**', redirectTo: 'anotherpage', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BillPayRoutingModule {}
