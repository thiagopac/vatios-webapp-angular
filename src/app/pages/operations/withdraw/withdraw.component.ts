import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Observable } from 'rxjs';
import { BalanceType } from 'src/app/models/balance';
import { AlertMessageService } from 'src/app/services/alert-message.service';
import { GeneralService } from 'src/app/services/general.service';
import { TransactionService } from 'src/app/services/transaction.service';

@Component({
  selector: 'app-withdraw',
  templateUrl: './withdraw.component.html',
  styleUrls: ['./withdraw.component.scss'],
})
export class WithdrawComponent implements OnInit {
  balance$: Observable<BalanceType>;

  @ViewChild('balanceFiatContainer', { static: false })
  balanceFiatContainer: ElementRef;

  constructor(
    private generalService: GeneralService,
    private transactionService: TransactionService,
    private alertMessageService: AlertMessageService,
    private changeDetector: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.getBalance();
  }

  triggeredActionCaptured(value: number): void {
    this.transactionService
      .createTransactionOperationWithdrawFiat(value)
      .subscribe(() => {
        this.alertMessageService.showAlert(
          'Solicitação de saque enviada com sucesso!',
          'success'
        );

        this.getBalance();
      });
  }

  getBalance() {
    this.balance$ = this.generalService.getUserBalance();
    this.changeDetector.detectChanges();
  }
}
