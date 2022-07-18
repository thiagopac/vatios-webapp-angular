import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatementComponent } from './statement.component';
import { RouterModule } from '@angular/router';
import { GeneralComponentsModule } from '../../../modules/general/general-components.module';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { GeneralService } from 'src/app/services/general/general.service';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { ContentLoaderModule } from '@ngneat/content-loader';

@NgModule({
  declarations: [StatementComponent],
  imports: [
    CommonModule,
    InlineSVGModule,
    RouterModule.forChild([
      {
        path: '',
        component: StatementComponent,
      },
    ]),
    GeneralComponentsModule,
    PipesModule,
    ContentLoaderModule,
  ],
  providers: [GeneralService],
})
export class StatementModule {}
