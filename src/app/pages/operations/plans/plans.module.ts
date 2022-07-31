import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlansComponent } from './plans.component';
import { RouterModule } from '@angular/router';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { FormsModule } from '@angular/forms';
import { PipesModule } from 'src/app/pipes/pipes.module';

@NgModule({
  declarations: [PlansComponent],
  imports: [
    CommonModule,
    InlineSVGModule,
    RouterModule.forChild([
      {
        path: '',
        component: PlansComponent,
      },
    ]),
    FormsModule,
    PipesModule,
  ],
})
export class PlansModule {}
