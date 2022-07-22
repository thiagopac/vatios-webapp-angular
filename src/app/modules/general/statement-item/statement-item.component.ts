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

  ngOnInit(): void {
    this.defineStatus(this.transaction);
  }

  defineStatus(transaction: ITransaction = {} as ITransaction): void {
    switch (transaction.status) {
      case 'awaiting-approval':
        this.statusColor = 'warning';
        this.icon = '/assets/media/icons/duotune/arrows/arr014.svg';
        break;
      case 'completed':
        this.statusColor = 'success';
        this.icon = '/assets/media/icons/duotune/arrows/arr016.svg';
        break;
      case 'processing':
        this.statusColor = 'primary';
        this.icon = '/assets/media/icons/duotune/arrows/arr028.svg';
        break;
      case 'disapproved':
        this.statusColor = 'danger';
        this.icon = '/assets/media/icons/duotune/arrows/arr015.svg';
        break;
      case 'failed':
        this.statusColor = 'danger';
        this.icon = '/assets/media/icons/duotune/arrows/arr015.svg';
        break;
      case 'ready-to-process':
        this.statusColor = 'primary';
        this.icon = '/assets/media/icons/duotune/arrows/arr027.svg';
        break;
      default:
        break;
    }
  }

}
