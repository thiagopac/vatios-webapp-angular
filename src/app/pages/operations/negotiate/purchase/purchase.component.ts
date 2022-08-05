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
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.scss'],
})
export class PurchaseComponent implements OnInit {
  balance$: Observable<BalanceType>;
  fiatToCrypto$: Observable<ExchangeRateType>;

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

  max(stValue: number, ndValue: number): number {
    return Math.floor(stValue / ndValue / 100);
  }

  triggeredActionCaptured(value: number): void {
    this.transactionService
      .createTransactionOperationFiatToCrypto(value)
      .subscribe(() => {
        this.alertMessageService.showToast(
          'Solicitação de compra de tokens enviada com sucesso!',
          'success'
        );

        this.getBalance();
      });
  }

  getBalance() {
    this.fiatToCrypto$ = this.assetService.getRateByPair('fiat-crypto');
    this.balance$ = this.generalService.getUserBalance();
    this.changeDetector.detectChanges();
  }
}
