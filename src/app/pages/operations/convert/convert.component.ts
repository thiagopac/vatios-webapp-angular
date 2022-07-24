import { ExchangeRateType } from 'src/app/services/asset.service';
import { BalanceType } from 'src/app/services/general.service';
import { Observable } from 'rxjs';
import { GeneralService } from 'src/app/services/general.service';
import { Component, OnInit } from '@angular/core';
import { AssetService } from 'src/app/services/asset.service';

@Component({
  selector: 'app-convert',
  templateUrl: './convert.component.html',
  styleUrls: ['./convert.component.scss'],
})
export class ConvertComponent implements OnInit {
  balance$: Observable<BalanceType>;
  energyToCrypto$: Observable<ExchangeRateType>;

  constructor(
    private generalService: GeneralService,
    private assetService: AssetService
  ) {}

  ngOnInit(): void {
    this.balance$ = this.generalService.getUserBalance();
    this.energyToCrypto$ = this.assetService.getRateByPair('energy-crypto');
  }

  triggeredActionCaptured(content: number): void {
    console.log('triggeredActionCaptured - content:', content);
  }
}
