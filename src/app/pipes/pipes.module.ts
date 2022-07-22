import { FriendlyTransactionStatus } from './friendly-transaction-status';
import { FriendlyInvoiceStatus } from './friendly-invoice-status';
import { AssetDescToAbbr } from './asset-desc-to-abbr.pipe';
import { UserFullnamePipe } from './user-fullname.pipe';
import { UserInitialsPipe } from './user-initials.pipe';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IntToCurrencyPipe } from 'src/app/pipes/int-to-currency.pipe';
import { FriendlyTransactionDescription } from 'src/app/pipes/friendly-transaction-description';

@NgModule({
  declarations: [
    IntToCurrencyPipe,
    UserInitialsPipe,
    UserFullnamePipe,
    AssetDescToAbbr,
    FriendlyInvoiceStatus,
    FriendlyTransactionStatus,
    FriendlyTransactionDescription,
  ],
  imports: [CommonModule],
  exports: [
    IntToCurrencyPipe,
    UserInitialsPipe,
    UserFullnamePipe,
    AssetDescToAbbr,
    FriendlyInvoiceStatus,
    FriendlyTransactionStatus,
    FriendlyTransactionDescription,
  ],
})
export class PipesModule {}
