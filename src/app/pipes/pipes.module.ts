import { FlatObjectPipe } from './flat-object.pipe';
import { FriendlyTransactionStatusPipe } from './friendly-transaction-status.pipe';
import { FriendlyInvoiceStatusPipe } from './friendly-invoice-status.pipe';
import { AssetDescToAbbr } from './asset-desc-to-abbr.pipe';
import { UserFullnamePipe } from './user-fullname.pipe';
import { UserInitialsPipe } from './user-initials.pipe';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IntToCurrencyPipe } from 'src/app/pipes/int-to-currency.pipe';
import { FriendlyTransactionDescriptionPipe } from 'src/app/pipes/friendly-transaction-description.pipe';
import { FriendlyTransactionStatusIconPipe } from 'src/app/pipes/friendly-transaction-status-icon.pipe';
import { FriendlyEventStatusPipe } from 'src/app/pipes/friendly-event-status.pipe';

@NgModule({
  declarations: [
    IntToCurrencyPipe,
    UserInitialsPipe,
    UserFullnamePipe,
    AssetDescToAbbr,
    FriendlyInvoiceStatusPipe,
    FriendlyTransactionStatusPipe,
    FriendlyTransactionDescriptionPipe,
    FriendlyTransactionStatusIconPipe,
    FlatObjectPipe,
    FriendlyEventStatusPipe
  ],
  imports: [CommonModule],
  exports: [
    IntToCurrencyPipe,
    UserInitialsPipe,
    UserFullnamePipe,
    AssetDescToAbbr,
    FriendlyInvoiceStatusPipe,
    FriendlyTransactionStatusPipe,
    FriendlyTransactionDescriptionPipe,
    FriendlyTransactionStatusIconPipe,
    FlatObjectPipe,
    FriendlyEventStatusPipe
  ],
})
export class PipesModule {}
