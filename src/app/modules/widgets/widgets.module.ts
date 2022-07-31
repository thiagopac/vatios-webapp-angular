import { PipesModule } from 'src/app/pipes/pipes.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgApexchartsModule } from 'ng-apexcharts';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ContentLoaderModule } from '@ngneat/content-loader';
import { WidgetBalanceListComponent } from './widget-balance-list/widget-balance-list.component';
import { WidgetSavingsComponent } from './widget-savings/widget-savings.component';
import { LastTransactionsComponent } from 'src/app/modules/widgets/widget-last-transactions/last-transactions/last-transactions.component';
import { LastTransactionsCellComponent } from 'src/app/modules/widgets/widget-last-transactions/last-transactions-cell/last-transactions-cell.component';
import { LastTransactionsEventsComponent } from 'src/app/modules/widgets/widget-last-transactions/last-transactions-events/last-transactions-events.component';

@NgModule({
  declarations: [
    WidgetBalanceListComponent,
    WidgetSavingsComponent,
    LastTransactionsComponent,
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
    WidgetBalanceListComponent,
    WidgetSavingsComponent,
    LastTransactionsComponent,
  ],
})
export class WidgetsModule {}
