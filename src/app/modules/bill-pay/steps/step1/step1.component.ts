import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ConsumerUnitType } from 'src/app/services/bill.service';
import { IPayBill } from '../../pay-bill.helper';

@Component({
  selector: 'app-step1',
  templateUrl: './step1.component.html',
})
export class Step1Component implements OnInit, OnDestroy {
  selectedConsumerUnit: ConsumerUnitType;

  @Input() updateParentModel: (part: Partial<IPayBill>, step: number) => void;

  private unsubscribe: Subscription[] = [];

  @Input() consumerUnits$: Observable<ConsumerUnitType[]>;

  constructor() {}

  ngOnInit() {}

  updateSelectedConsumerUnit(consumerUnit: ConsumerUnitType) {
    this.updateParentModel({ consumerUnit }, 1);
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
