import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgApexchartsModule } from 'ng-apexcharts';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AssetComponent } from './asset-component/asset.component';
import { StatementBalanceComponent } from './statement-balance/statement-balance.component';
import { StatementItemComponent } from './statement-item/statement-item.component';
import { StatementCellComponent } from './statement-cell/statement-cell.component';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { ContentLoaderModule } from '@ngneat/content-loader';
import { WidgetsModule } from 'src/app/modules/widgets/widgets.module';

@NgModule({
  declarations: [
    AssetComponent,
    StatementBalanceComponent,
    StatementItemComponent,
    StatementCellComponent,
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
    WidgetsModule,
  ],
  exports: [
    AssetComponent,
    StatementBalanceComponent,
    StatementItemComponent,
    StatementCellComponent,
  ],
})
export class GeneralComponentsModule {}
