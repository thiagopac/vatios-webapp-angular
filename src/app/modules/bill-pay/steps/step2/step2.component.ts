import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UserInvoiceType } from 'src/app/models/user_invoice';
import { IPayBill } from '../../../../models/pay_bill.helper';

@Component({
  selector: 'app-step2',
  templateUrl: './step2.component.html',
})
export class Step2Component implements OnInit {
  selectedUserInvoice: UserInvoiceType;

  @Input() updateParentModel: (part: Partial<IPayBill>, step: number) => void;
  @Input() invoices$: Observable<UserInvoiceType[]>;

  constructor() {}

  ngOnInit() {}

  updateSelectedUserInvoice(userInvoice: UserInvoiceType) {
    this.updateParentModel({ userInvoice }, 2);
  }
}
