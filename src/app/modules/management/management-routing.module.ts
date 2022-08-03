import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManagementAdminsComponent } from 'src/app/modules/management/modules/management-admins/management-admins.component';
import { ManagementHomeComponent } from 'src/app/modules/management/modules/management-home/management-home.component';
import { ManagementTransactionsComponent } from 'src/app/modules/management/modules/management-transactions/management-transactions.component';
import { ManagementUsersComponent } from 'src/app/modules/management/modules/management-users/management-users.component';
import { ManagementComponent } from './management.component';

export const routes: Routes = [
  {
    path: '',
    component: ManagementComponent,
    children: [
      {
        path: 'home',
        component: ManagementHomeComponent
      },
      {
        path: 'transactions',
        component: ManagementTransactionsComponent
      },
      {
        path: 'users',
        component: ManagementUsersComponent
      },
      {
        path: 'admins',
        component: ManagementAdminsComponent
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManagementRoutingModule {}
