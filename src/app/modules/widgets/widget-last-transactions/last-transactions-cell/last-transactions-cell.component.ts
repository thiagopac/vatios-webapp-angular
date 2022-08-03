import { Component, Input, OnInit } from '@angular/core';
import { IEvent } from 'src/app/models/event';
import { TransactionType } from 'src/app/services/general.service';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: '[app-last-transactions-cell]',
  templateUrl: './last-transactions-cell.component.html',
  styleUrls: ['./last-transactions-cell.component.scss'],
})
export class LastTransactionsCellComponent implements OnInit {
  description: string;
  statusName: string;
  statusColor: string;
  date: string;
  events: IEvent[];

  @Input() transaction: TransactionType;

  constructor() {}

  ngOnInit(): void {}
}
