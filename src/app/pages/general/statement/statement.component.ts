import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable, switchMap } from 'rxjs';
import { scan } from 'rxjs/operators';
import { BalanceType } from 'src/app/models/balance';
import { TransactionType } from 'src/app/models/transaction';
import { GeneralService } from 'src/app/services/general.service';

@Component({
  selector: 'app-statement',
  templateUrl: './statement.component.html',
  styleUrls: ['./statement.component.scss'],
})
export class StatementComponent implements OnInit {
  balance$: Observable<BalanceType>;
  public transactions$: Observable<TransactionType[]>;
  private fetch$ = new BehaviorSubject<void>(undefined);

  constructor(private generalService: GeneralService) {}

  ngOnInit(): void {
    this.balance$ = this.generalService.getUserBalance();
    this.transactions$ = this.generalService.getUserTransactions(1);

    this.transactions$ = combineLatest([this.transactions$]).pipe(
      switchMap(() =>
        this.fetch$.pipe(
          switchMap((_, pageIndex) =>
            this.generalService.getUserTransactions(pageIndex + 1)
          ),
          scan((all: any, page: any) => all.concat(page), [])
        )
      )
    );
  }

  fetchMore() {
    this.fetch$.next();
  }
}
