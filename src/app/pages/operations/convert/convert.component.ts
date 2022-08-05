import { Observable } from 'rxjs';
import { GeneralService } from 'src/app/services/general.service';
import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { AssetService } from 'src/app/services/asset.service';
import { BalanceType } from 'src/app/models/balance';
import { ExchangeRateType } from 'src/app/models/exchange_rate';
import { TransactionService } from 'src/app/services/transaction.service';
import { AlertMessageService } from 'src/app/services/alert-message.service';

@Component({
  selector: 'app-convert',
  templateUrl: './convert.component.html',
  styleUrls: ['./convert.component.scss'],
})
export class ConvertComponent implements OnInit {
  balance$: Observable<BalanceType>;
  energyToCrypto$: Observable<ExchangeRateType>;

  @ViewChild('balanceEnergyContainer', { static: false })
  balanceEnergyContainer: ElementRef;

  constructor(
    private generalService: GeneralService,
    private assetService: AssetService,
    private transactionService: TransactionService,
    private alertMessageService: AlertMessageService,
    private changeDetector: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.getBalance();
  }

  triggeredActionCaptured(value: number): void {
    this.transactionService
      .createTransactionOperationEnergyToCrypto(value)
      .subscribe(() => {
        this.alertMessageService.showToast(
          'Solicitação de conversão de créditos de energia enviada com sucesso!',
          'success'
        );

        this.getBalance();
      });
  }

  getBalance() {
    this.energyToCrypto$ = this.assetService.getRateByPair('energy-crypto');
    this.balance$ = this.generalService.getUserBalance();
    this.changeDetector.detectChanges();
  }
}
