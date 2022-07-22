import { IEvent } from '../../../../models/event';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-last-transactions-events',
  templateUrl: './last-transactions-events.component.html',
  styleUrls: ['./last-transactions-events.component.scss'],
})
export class LastTransactionsEventsComponent implements OnInit {
  @Input() events: IEvent[] | undefined;

  constructor() {}

  ngOnInit(): void {}

  getEventColor(event: IEvent) {
    if (event.movement === 'outgoing') return 'danger';
    else return 'success';
  }

  getEventSymbol(event: IEvent) {
    if (event.movement === 'outgoing') return '-';
    else return '+';
  }
}
