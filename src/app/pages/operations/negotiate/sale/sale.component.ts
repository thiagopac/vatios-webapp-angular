import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AssetService, ExchangeRateType } from 'src/app/services/asset.service';
import { BalanceType, GeneralService } from 'src/app/services/general.service';

@Component({
  selector: 'app-sale',
  templateUrl: './sale.component.html',
  styleUrls: ['./sale.component.scss'],
})
export class SaleComponent implements OnInit {
  balance$: Observable<BalanceType>;
  cryptoToFiat$: Observable<ExchangeRateType>;

  constructor(
    private generalService: GeneralService,
    private assetService: AssetService
  ) {}

  ngOnInit(): void {
    this.balance$ = this.generalService.getUserBalance();
    this.cryptoToFiat$ = this.assetService.getRateByPair('crypto-fiat');
  }

  max(stValue: number): number {
    return stValue / 100;
  }
}
