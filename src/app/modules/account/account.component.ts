import { BalanceType } from './../../services/general/general.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { AuthService, UserType } from 'src/app/modules/auth';
import {
  GeneralService,
} from 'src/app/services/general/general.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
})
export class AccountComponent implements OnInit, OnDestroy {
  user$: Observable<UserType>;
  balance$: Observable<BalanceType>;
  private unsubscribe: Subscription[] = [];

  constructor(
    private auth: AuthService,
    private generalService: GeneralService
  ) {}

  ngOnInit(): void {
    this.user$ = this.auth.currentUserSubject.asObservable();
    this.balance$ = this.generalService.getUserBalance();
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
