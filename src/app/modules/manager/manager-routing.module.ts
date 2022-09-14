import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManagerAdminsComponent } from 'src/app/modules/manager/modules/manager-admins/manager-admins.component';
import { ManagerHomeComponent } from 'src/app/modules/manager/modules/manager-home/manager-home.component';
import { ManagerTransactionsComponent } from 'src/app/modules/manager/modules/manager-transactions/manager-transactions.component';
import { ManagerUsersComponent } from 'src/app/modules/manager/modules/manager-users/manager-users.component';
import { ManagerComponent } from './manager.component';

export const routes: Routes = [
  {
    path: '',
    component: ManagerComponent,
    children: [
      {
        path: '',
        component: ManagerHomeComponent,
      },
      {
        path: 'home',
        component: ManagerHomeComponent,
      },
      {
        path: 'transactions',
        component: ManagerTransactionsComponent,
      },
      {
        path: 'users',
        component: ManagerUsersComponent,
      },
      {
        path: 'admins',
        component: ManagerAdminsComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManagerRoutingModule {}
