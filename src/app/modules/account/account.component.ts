import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService, UserType } from 'src/app/modules/auth';
import { GeneralService } from 'src/app/services/general.service';
import { AsyncPipe } from '@angular/common';
import { BalanceType } from 'src/app/models/balance';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
})
export class AccountComponent implements OnInit {
  user: UserType;
  balance$: Observable<BalanceType>;

  constructor(
    private auth: AuthService,
    private generalService: GeneralService,
    private asyncPipe: AsyncPipe
  ) {}

  ngOnInit(): void {
    this.user = this.asyncPipe.transform(
      this.auth.currentUserSubject.asObservable()
    )!;
    this.balance$ = this.generalService.getUserBalance();
  }
}
