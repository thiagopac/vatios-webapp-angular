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
  description: string;
  statusName: string;
  statusColor: string;
  date: string;
  events: IEvent[];

  @Input() transaction: ITransaction;

  constructor() {}

  ngOnInit(): void {
    this.defineStatus(this.transaction);
    this.defineDescription(this.transaction);
  }

  defineStatus(transaction: ITransaction = {} as ITransaction): void {
    switch (transaction.status) {
      case 'awaiting-approval':
        this.statusColor = 'warning';
        this.statusName = 'Aguardando aprovação';
        this.icon = '/assets/media/icons/duotune/arrows/arr014.svg';
        break;
      case 'completed':
        this.statusColor = 'success';
        this.statusName = 'Realizado';
        this.icon = '/assets/media/icons/duotune/arrows/arr016.svg';
        break;
      case 'processing':
        this.statusColor = 'primary';
        this.statusName = 'Processando';
        this.icon = '/assets/media/icons/duotune/arrows/arr028.svg';
        break;
      case 'disapproved':
        this.statusColor = 'danger';
        this.statusName = 'Reprovado';
        this.icon = '/assets/media/icons/duotune/arrows/arr015.svg';
        break;
      case 'failed':
        this.statusColor = 'danger';
        this.statusName = 'Falhou';
        this.icon = '/assets/media/icons/duotune/arrows/arr015.svg';
        break;
      case 'ready-to-process':
        this.statusColor = 'primary';
        this.statusName = 'Pronto para processar';
        this.icon = '/assets/media/icons/duotune/arrows/arr027.svg';
        break;
      default:
        break;
    }
  }

  defineDescription(transaction: ITransaction = {} as ITransaction): void {
    switch (transaction.type) {
      case 'Operation - Energy to Crypto':
        this.description = 'Conversão de energia para tokens';
        break;
      case 'Operation - Fiat to Crypto':
        this.description = 'Compra de tokens';
        break;
      case 'Operation - Crypto to Fiat':
        this.description = 'Venda de tokens';
        break;
      case 'Operation - Withdraw Fiat':
        this.description = 'Saque para conta corrente';
        break;
      case 'Bill - Pay':
        this.description = 'Pagamento de fatura de energia';
        break;
      default:
        break;
    }
  }
}
