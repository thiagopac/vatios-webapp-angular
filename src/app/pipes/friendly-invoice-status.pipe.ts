import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'friendlyInvoiceStatusPipe',
})
@Injectable({
  providedIn: 'root',
})
export class FriendlyInvoiceStatusPipe implements PipeTransform {
  transform(status: string): string {
    let output: string = '';

    switch (status) {
      case 'payment-pending':
        output = this.getBadge('danger', 'Em aberto');
        break;
      case 'payment-processing':
        output = this.getBadge('primary', 'Processando pagamento');
        break;
      case 'payment-done':
        output = this.getBadge('success', 'Pago');
        break;
      default:
        break;
    }

    return output;
  }

  getBadge(color:string, status: string): string {
    return `<div class="badge badge-light-${color} fw-bolder">${status}</div>`
  }
}
