import { WidgetsModule } from '../../../modules/widgets/widgets.module';
import { GeneralComponentsModule } from '../../../modules/general/general-components.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WalletComponent } from './wallet.component';
import { RouterModule } from '@angular/router';
import { ContentLoaderModule } from '@ngneat/content-loader';

@NgModule({
  declarations: [WalletComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: WalletComponent,
      },
    ]),
    WidgetsModule,
    GeneralComponentsModule,
    ContentLoaderModule,
  ],
})
export class WalletModule {}
