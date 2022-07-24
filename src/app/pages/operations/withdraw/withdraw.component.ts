import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BalanceType, GeneralService } from 'src/app/services/general.service';

@Component({
  selector: 'app-withdraw',
  templateUrl: './withdraw.component.html',
  styleUrls: ['./withdraw.component.scss'],
})
export class WithdrawComponent implements OnInit {
  balance$: Observable<BalanceType>;

  constructor(private generalService: GeneralService) {}

  ngOnInit(): void {
    this.balance$ = this.generalService.getUserBalance();
  }

  triggeredActionCaptured(content: number): void {
    console.log('triggeredActionCaptured - content:', content);
  }
}
