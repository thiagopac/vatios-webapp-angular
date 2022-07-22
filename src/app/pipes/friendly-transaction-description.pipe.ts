import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'friendlyTransactionDescriptionPipe',
})
@Injectable({
  providedIn: 'root',
})
export class FriendlyTransactionDescriptionPipe implements PipeTransform {
  transform(description: string): string {
    let output: string = '';

    switch (description) {
      case 'Operation - Energy to Crypto':
        output = 'Conversão de energia para tokens';
        break;
      case 'Operation - Fiat to Crypto':
        output = 'Compra de tokens';
        break;
      case 'Operation - Crypto to Fiat':
        output = 'Venda de tokens';
        break;
      case 'Operation - Withdraw Fiat':
        output = 'Saque para conta corrente';
        break;
      case 'Bill - Pay':
        output = 'Pagamento de fatura de energia';
        break;
      default:
        break;
    }

    return output;
  }

}
