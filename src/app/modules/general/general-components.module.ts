import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgApexchartsModule } from 'ng-apexcharts';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { LastTransactionsComponent } from '../widgets/widget-last-transactions/last-transactions/last-transactions.component';
import { AssetComponent } from './asset-component/asset.component';
import { StatementBalanceComponent } from './statement-balance/statement-balance.component';
import { StatementItemComponent } from './statement-item/statement-item.component';
import { StatementCellComponent } from './statement-cell/statement-cell.component';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { LastTransactionsCellComponent } from '../widgets/widget-last-transactions/last-transactions-cell/last-transactions-cell.component';
import { LastTransactionsEventsComponent } from '../widgets/widget-last-transactions/last-transactions-events/last-transactions-events.component';
import { ContentLoaderModule } from '@ngneat/content-loader';

@NgModule({
  declarations: [
    LastTransactionsComponent,
    AssetComponent,
    StatementBalanceComponent,
    StatementItemComponent,
    StatementCellComponent,
    LastTransactionsCellComponent,
    LastTransactionsEventsComponent,
  ],
  imports: [
    CommonModule,
    InlineSVGModule,
    NgApexchartsModule,
    NgbDropdownModule,
    FormsModule,
    RouterModule,
    PipesModule,
    ContentLoaderModule,
  ],
  exports: [
    LastTransactionsComponent,
    AssetComponent,
    StatementBalanceComponent,
    StatementItemComponent,
    StatementCellComponent,
  ],
})
export class GeneralComponentsModule {}
