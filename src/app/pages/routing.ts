import { Routes } from '@angular/router';

const Routing: Routes = [
  {
    path: 'general/wallet',
    loadChildren: () =>
      import('./general/wallet/wallet.module').then((m) => m.WalletModule),
  },
  {
    path: 'general/balance',
    loadChildren: () =>
      import('./general/balance/balance.module').then((m) => m.BalanceModule),
  },
  {
    path: 'general/statement',
    loadChildren: () =>
      import('./general/statement/statement.module').then(
        (m) => m.StatementModule
      ),
  },
  {
    path: 'operations/convert',
    loadChildren: () =>
      import('./operations/convert/convert.module').then(
        (m) => m.ConvertModule
      ),
  },
  {
    path: 'operations/negotiate',
    loadChildren: () =>
      import('./operations/negotiate/negotiate.module').then(
        (m) => m.NegotiateModule
      ),
  },
  {
    path: 'operations/withdraw',
    loadChildren: () =>
      import('./operations/withdraw/withdraw.module').then(
        (m) => m.WithdrawModule
      ),
  },
  {
    path: 'operations/plans',
    loadChildren: () =>
      import('./operations/plans/plans.module').then((m) => m.PlansModule),
  },
  {
    path: 'bill/history',
    loadChildren: () =>
      import('./bill/history/history.module').then((m) => m.HistoryModule),
  },
  {
    path: 'bill/ownership',
    loadChildren: () =>
      import('./bill/ownership/ownership.module').then(
        (m) => m.OwnershipModule
      ),
  },
  {
    path: 'bill/pay',
    loadChildren: () =>
      import('./bill/pay/pay.module').then((m) => m.PayModule),
  },
  {
    path: 'account',
    loadChildren: () =>
      import('../modules/account/account.module').then((m) => m.AccountModule),
  },
  {
    path: '',
    redirectTo: '/general/wallet',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'error/404',
  },
];

export { Routing };
