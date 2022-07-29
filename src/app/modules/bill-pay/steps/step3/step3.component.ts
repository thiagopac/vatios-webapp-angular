import { Component, Input, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { IUserInvoiceCompensationDetails } from 'src/app/models/user_invoice';

@Component({
  selector: 'app-step3',
  templateUrl: './step3.component.html',
})
export class Step3Component implements OnInit {

  @Input() invoiceCompensationDetails$: Observable<IUserInvoiceCompensationDetails>;

  constructor() {}

  ngOnInit() {}

}
