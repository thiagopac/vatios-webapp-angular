import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PurchaseComponent } from './purchase/purchase.component';
import { SaleComponent } from './sale/sale.component';
import { OperationsComponentsModule } from '../../../modules/operations/operations-components.module';
import { RouterModule } from '@angular/router';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { PipesModule } from 'src/app/pipes/pipes.module';

@NgModule({
  declarations: [PurchaseComponent, SaleComponent],
  imports: [
    CommonModule,
    InlineSVGModule,
    RouterModule.forChild([
      {
        path: 'purchase',
        component: PurchaseComponent,
      },
      {
        path: 'sale',
        component: SaleComponent,
      },
    ]),
    OperationsComponentsModule,
    PipesModule,
  ],
  exports: [PurchaseComponent, SaleComponent],
})
export class NegotiateModule {}
