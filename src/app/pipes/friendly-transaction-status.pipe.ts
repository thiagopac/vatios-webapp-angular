import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'friendlyTransactionStatusPipe',
})
@Injectable({
  providedIn: 'root',
})
export class FriendlyTransactionStatusPipe implements PipeTransform {
  transform(status: string): string {
    let output: string = '';

    switch (status) {
      case 'awaiting-approval':
        output = this.getBadge('warning', 'Aguardando aprovação');
        break;
      case 'completed':
        output = this.getBadge('success', 'Realizado');
        break;
      case 'processing':
        output = this.getBadge('primary', 'Processando');
        break;
      case 'disapproved':
        output = this.getBadge('danger', 'Reprovado');
        break;
      case 'failed':
        output = this.getBadge('danger', 'Falhou');
        break;
      case 'ready-to-process':
        output = this.getBadge('primary', 'Pronto para processar');
        break;
      default:
        break;
    }

    return output;
  }

  getBadge(color: string, status: string): string {
    return `<div class="badge badge-light-${color} fw-bold">${status}</div>`;
  }
}
