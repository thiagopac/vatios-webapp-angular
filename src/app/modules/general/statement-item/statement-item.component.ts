import { Component, Input, OnInit } from '@angular/core';
import { IEvent } from 'src/app/models/event';
import { ITransaction } from 'src/app/models/transaction';

@Component({
  selector: 'app-statement-item-component',
  templateUrl: './statement-item.component.html',
  styleUrls: ['./statement-item.component.scss'],
})
export class StatementItemComponent implements OnInit {
  icon: string;
  statusColor: string;
  date: string;
  events: IEvent[];

  @Input() transaction: ITransaction;

  constructor() {}

  ngOnInit(): void {}
}
