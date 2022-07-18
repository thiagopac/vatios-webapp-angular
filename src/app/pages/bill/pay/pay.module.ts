import { BillPayModule } from './../../../modules/bill-pay/bill-pay.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PayComponent } from './pay.component';
import { RouterModule } from '@angular/router';
import {} from '../../../modules/bill-pay/bill-pay.module';

@NgModule({
  declarations: [PayComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: PayComponent,
      },
    ]),
    BillPayModule,
  ],
})
export class PayModule {}
