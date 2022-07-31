import { Component, Input, OnInit } from '@angular/core';

import { Observable, Subscription } from 'rxjs';
import { IUserInvoiceCompensationDetails } from 'src/app/models/user_invoice';

@Component({
  selector: 'app-step4',
  templateUrl: './step4.component.html',
})
export class Step4Component implements OnInit {
  @Input()
  invoiceCompensationDetails$: Observable<IUserInvoiceCompensationDetails>;

  constructor() {}

  ngOnInit() {}
}
