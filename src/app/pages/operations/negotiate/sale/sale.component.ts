import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Observable } from 'rxjs';
import { BalanceType } from 'src/app/models/balance';
import { ExchangeRateType } from 'src/app/models/exchange_rate';
import { AlertMessageService } from 'src/app/services/alert-message.service';
import { AssetService } from 'src/app/services/asset.service';
import { GeneralService } from 'src/app/services/general.service';
import { TransactionService } from 'src/app/services/transaction.service';

@Component({
  selector: 'app-sale',
  templateUrl: './sale.component.html',
  styleUrls: ['./sale.component.scss'],
})
export class SaleComponent implements OnInit {
  balance$: Observable<BalanceType>;
  cryptoToFiat$: Observable<ExchangeRateType>;

  @ViewChild('balanceFiatContainer', { static: false })
  balanceFiatContainer: ElementRef;
  @ViewChild('balanceCryptoContainer', { static: false })
  balanceCryptoContainer: ElementRef;

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

  max(stValue: number): number {
    return stValue / 100;
  }

  triggeredActionCaptured(value: number): void {
    this.transactionService
      .createTransactionOperationCryptoToFiat(value)
      .subscribe(() => {
        this.alertMessageService.showToast(
          'Solicitação de venda de tokens enviada com sucesso!',
          'success'
        );

        this.getBalance();
      });
  }

  getBalance() {
    this.cryptoToFiat$ = this.assetService.getRateByPair('crypto-fiat');
    this.balance$ = this.generalService.getUserBalance();
    this.changeDetector.detectChanges();
  }
}
