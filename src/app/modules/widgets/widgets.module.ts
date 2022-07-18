import { PipesModule } from 'src/app/pipes/pipes.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgApexchartsModule } from 'ng-apexcharts';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { WidgetBalanceListComponent } from './widget-balance-list/widget-balance-list.component';
import { WidgetSavingsComponent } from './widget-savings/widget-savings.component';

@NgModule({
  declarations: [WidgetBalanceListComponent, WidgetSavingsComponent],
  imports: [
    CommonModule,
    InlineSVGModule,
    NgApexchartsModule,
    NgbDropdownModule,
    FormsModule,
    RouterModule,
    PipesModule,
  ],
  exports: [WidgetBalanceListComponent, WidgetSavingsComponent],
})
export class WidgetsModule {}
