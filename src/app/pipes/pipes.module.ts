import { AssetDescToAbbr } from './asset-desc-to-abbr.pipe';
import { UserFullnamePipe } from './user-fullname.pipe';
import { UserInitialsPipe } from './user-initials.pipe';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IntToCurrencyPipe } from 'src/app/pipes/int-to-currency.pipe';

@NgModule({
  declarations: [
    IntToCurrencyPipe,
    UserInitialsPipe,
    UserFullnamePipe,
    AssetDescToAbbr,
  ],
  imports: [CommonModule],
  exports: [
    IntToCurrencyPipe,
    UserInitialsPipe,
    UserFullnamePipe,
    AssetDescToAbbr,
  ],
})
export class PipesModule {}
