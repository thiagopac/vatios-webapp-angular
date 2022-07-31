import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { UserInvoiceType } from 'src/app/services/bill.service';
import { IPayBill } from '../../pay-bill.helper';

@Component({
  selector: 'app-step2',
  templateUrl: './step2.component.html',
})
export class Step2Component implements OnInit, OnDestroy {
  selectedUserInvoice: UserInvoiceType;

  @Input() updateParentModel: (part: Partial<IPayBill>, step: number) => void;

  private unsubscribe: Subscription[] = [];

  @Input() invoices$: Observable<UserInvoiceType[]>;

  constructor() {}

  ngOnInit() {}

  updateSelectedUserInvoice(userInvoice: UserInvoiceType) {
    this.updateParentModel({ userInvoice }, 2);
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
