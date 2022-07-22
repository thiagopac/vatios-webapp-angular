import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { HistoryComponent } from './history.component';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { NgxMaskModule } from 'ngx-mask';

@NgModule({
  declarations: [HistoryComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: HistoryComponent,
      },
    ]),
    MatTableModule,
    MatPaginatorModule,
    PipesModule,
    NgxMaskModule.forRoot(),
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [DatePipe]
})
export class HistoryModule {}
