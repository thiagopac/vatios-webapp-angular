import { Component, Input } from '@angular/core';
import { IPayBill, IPaymentMethodEnum } from 'src/app/models/pay_bill.helper';

@Component({
  selector: 'app-step5',
  templateUrl: './step5.component.html',
})
export class Step5Component {
  readonly IPaymentMethodEnum = IPaymentMethodEnum;
  @Input() updateParentModel: (part: Partial<IPayBill>, step: number) => void;

  constructor() {}

  updateSelectedMethod(paymentMethod: IPaymentMethodEnum) {
    this.updateParentModel({ paymentMethod }, 5);
  }
}
