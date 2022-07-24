import { PipesModule } from 'src/app/pipes/pipes.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { OperationExchangeComponent } from './operation-exchange/operation-exchange.component';
import { OperationWithdrawComponent } from './operation-withdraw/widget-operation-withdraw.component';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import {
  CurrencyMaskConfig,
  CurrencyMaskModule,
  CURRENCY_MASK_CONFIG,
} from 'ng2-currency-mask';
import { InputRestrictionDirective } from 'src/app/directives/input-restriction.directive';

export const options: Partial<IConfig> | (() => Partial<IConfig>) = {};
export const CustomCurrencyMaskConfig: CurrencyMaskConfig = {
  align: 'right',
  allowNegative: false,
  decimal: ',',
  precision: 2,
  prefix: '',
  suffix: '',
  thousands: '.',
};

@NgModule({
  declarations: [
    OperationExchangeComponent,
    OperationWithdrawComponent,
    InputRestrictionDirective,
  ],
  imports: [
    CommonModule,
    InlineSVGModule,
    FormsModule,
    NgxMaskModule.forRoot(options),
    CurrencyMaskModule,
    RouterModule,
    PipesModule,
  ],
  exports: [OperationExchangeComponent, OperationWithdrawComponent],
  providers: [
    { provide: CURRENCY_MASK_CONFIG, useValue: CustomCurrencyMaskConfig },
  ],
})
export class OperationsComponentsModule {}
