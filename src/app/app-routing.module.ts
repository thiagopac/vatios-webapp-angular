import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminAuthGuard } from 'src/app/services/admin-auth';
import { AuthGuard } from './services/auth';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
      import('./modules/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'admin-auth',
    loadChildren: () =>
      import('./modules/admin-auth/admin-auth.module').then(
        (m) => m.AdminAuthModule
      ),
  },
  {
    path: 'error',
    loadChildren: () =>
      import('./modules/errors/errors.module').then((m) => m.ErrorsModule),
  },
  {
    path: '',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./template/layout/layout.module').then((m) => m.LayoutModule),
  },
  {
    path: 'manager',
    // canActivate: [AdminAuthGuard],
    canActivate: [AdminAuthGuard],
    loadChildren: () =>
      import('./modules/manager/manager.module').then(
        (m) => m.ManagerModule
      ),
  },
  { path: '**', redirectTo: 'error/404' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
