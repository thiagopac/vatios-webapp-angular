import { PipesModule } from 'src/app/pipes/pipes.module';
import { OperationsComponentsModule } from '../../../modules/operations/operations-components.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConvertComponent } from './convert.component';
import { RouterModule } from '@angular/router';
import { InlineSVGModule } from 'ng-inline-svg-2';

@NgModule({
  declarations: [ConvertComponent],
  imports: [
    CommonModule,
    InlineSVGModule,
    RouterModule.forChild([
      {
        path: '',
        component: ConvertComponent,
      },
    ]),
    OperationsComponentsModule,
    PipesModule,
  ],
})
export class ConvertModule {}
