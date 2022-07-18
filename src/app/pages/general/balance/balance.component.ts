import {
  GeneralService,
  Balance,
} from 'src/app/services/general/general.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.scss'],
})
export class BalanceComponent implements OnInit, OnDestroy {
  private unsubscribe: Subscription[] = [];
  balance$: Observable<Balance>;

  constructor(private generalService: GeneralService) {}

  ngOnInit(): void {
    this.balance$ = this.generalService.getUserBalance();
  }

  // loadData(): void {

  //   this.spinner.show();
  //   this.generalService
  //     .getUserBalance()
  //     .subscribe()
  //     .add(() => this.spinner.hide());
  // }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
