import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { TransactionType } from 'src/app/models/transaction';
import { GeneralService } from 'src/app/services/general.service';

@Component({
  selector: 'app-last-transactions-component',
  templateUrl: './last-transactions.component.html',
})
export class LastTransactionsComponent implements OnInit, OnDestroy {
  constructor(private generalService: GeneralService) {}

  private unsubscribe: Subscription[] = [];
  transactions$: Observable<TransactionType[]>;

  ngOnInit(): void {
    this.transactions$ = this.generalService.getUserLastTransactions(1);
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
