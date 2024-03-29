import { GeneralService } from 'src/app/services/general.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BalanceType } from 'src/app/models/balance';

@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.scss'],
})
export class BalanceComponent implements OnInit {
  balance$: Observable<BalanceType>;

  constructor(private generalService: GeneralService) {}

  ngOnInit(): void {
    this.balance$ = this.generalService.getUserBalance();
  }
}
