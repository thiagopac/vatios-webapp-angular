import { PipesModule } from 'src/app/pipes/pipes.module';
import { GeneralService } from 'src/app/services/general/general.service';
import { GeneralComponentsModule } from 'src/app/modules/general/general-components.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BalanceComponent } from './balance.component';
import { RouterModule } from '@angular/router';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { FormsModule } from '@angular/forms';
import { ContentLoaderModule } from '@ngneat/content-loader';

@NgModule({
  declarations: [BalanceComponent],
  imports: [
    CommonModule,
    InlineSVGModule,
    RouterModule.forChild([
      {
        path: '',
        component: BalanceComponent,
      },
    ]),
    GeneralComponentsModule,
    FormsModule,
    PipesModule,
    ContentLoaderModule,
  ],
  providers: [GeneralService],
})
export class BalanceModule {}
