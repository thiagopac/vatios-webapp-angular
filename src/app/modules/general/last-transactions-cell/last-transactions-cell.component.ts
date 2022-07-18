import { Component, Input, OnInit } from '@angular/core';
import { IEvent } from 'src/app/models/event';
import { ITransaction } from 'src/app/models/transaction';
import { Transaction } from 'src/app/services/general/general.service';

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

  @Input() transaction: Transaction;

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
        break;
      case 'completed':
        this.statusColor = 'success';
        this.statusName = 'Realizado';
        break;
      case 'processing':
        this.statusColor = 'primary';
        this.statusName = 'Processando';
        break;
      case 'disapproved':
        this.statusColor = 'danger';
        this.statusName = 'Reprovado';
        break;
      case 'failed':
        this.statusColor = 'danger';
        this.statusName = 'Falhou';
        break;
      case 'ready-to-process':
        this.statusColor = 'primary';
        this.statusName = 'Pronto para processar';
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
