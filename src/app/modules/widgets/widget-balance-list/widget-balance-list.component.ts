import { Component, Input } from '@angular/core';
import { WalletFiduciaryValuesType } from 'src/app/services/general/general.service';

@Component({
  selector: 'app-widget-balance-list',
  templateUrl: './widget-balance-list.component.html',
})
export class WidgetBalanceListComponent {
  @Input() color: string = '';
  @Input() data: WalletFiduciaryValuesType;

  constructor() {}
}
