import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OwnershipComponent } from './ownership.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [OwnershipComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: OwnershipComponent,
      },
    ]),
  ],
})
export class OwnershipModule {}
