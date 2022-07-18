import { OperationsComponentsModule } from '../../../modules/operations/operations-components.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WithdrawComponent } from './withdraw.component';
import { RouterModule } from '@angular/router';
import { InlineSVGModule } from 'ng-inline-svg-2';

@NgModule({
  declarations: [WithdrawComponent],
  imports: [
    CommonModule,
    InlineSVGModule,
    RouterModule.forChild([
      {
        path: '',
        component: WithdrawComponent,
      },
    ]),
    OperationsComponentsModule,
  ],
})
export class WithdrawModule {}
