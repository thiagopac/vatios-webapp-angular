import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'intToCurrency',
})
@Injectable({
  providedIn: 'root',
})
export class IntToCurrencyPipe implements PipeTransform {
  transform(value: number, clip: boolean = true): string {
    if (value === 0 || value === undefined) return '0';
    let strValue: string = value.toString();

    let integerPart = strValue.substring(0, strValue.length - 2);
    integerPart = this.addThousandDots(integerPart);

    const fractionalPart = strValue.substring(
      strValue.length - 2,
      strValue.length
    );
    const full = `${integerPart},${fractionalPart}`;

    if (fractionalPart === '00' && clip === true) {
      return integerPart;
    }

    return full;
  }

  addThousandDots(value: string) {
    const parts = value.split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    return parts.join(',');
  }
}
