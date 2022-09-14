import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'friendlyEventStatusPipe',
})
@Injectable({
  providedIn: 'root',
})
export class FriendlyEventStatusPipe implements PipeTransform {
  transform(status: string): string {
    let output: string = '';

    switch (status) {
      case 'awaiting-run':
        output = this.getBadge('primary', 'Aguardando execução');
        break;
      case 'success':
        output = this.getBadge('success', 'Sucesso');
        break;
      case 'processing':
        output = this.getBadge('primary', 'Processando');
        break;
      case 'canceled':
        output = this.getBadge('danger', 'Cancelado');
        break;
      case 'failed':
        output = this.getBadge('danger', 'Falhou');
        break;
      case 'locked':
        output = this.getBadge('warning', 'Bloqueado');
        break;
      case 'running':
        output = this.getBadge('primary', 'Executando...');
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
