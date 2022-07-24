import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AssetService, ExchangeRateType } from 'src/app/services/asset.service';
import { BalanceType, GeneralService } from 'src/app/services/general.service';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.scss'],
})
export class PurchaseComponent implements OnInit {
  balance$: Observable<BalanceType>;
  fiatToCrypto$: Observable<ExchangeRateType>;

  constructor(
    private generalService: GeneralService,
    private assetService: AssetService
  ) {}

  ngOnInit(): void {
    this.balance$ = this.generalService.getUserBalance();
    this.fiatToCrypto$ = this.assetService.getRateByPair('fiat-crypto');
  }

  max(stValue: number, ndValue: number): number {
    return Math.floor(stValue / ndValue / 100);
  }
}
