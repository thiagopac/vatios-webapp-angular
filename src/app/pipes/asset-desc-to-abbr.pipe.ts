import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'assetDescToAbbr',
})
@Injectable({
  providedIn: 'root',
})
export class AssetDescToAbbr implements PipeTransform {
  transform(desc: string): string {
    let abbr: string = '';

    switch (desc) {
      case 'energy':
        abbr = 'kWh';
        break;
      case 'crypto':
        abbr = 'DEC';
        break;
      case 'fiat':
        abbr = 'BRL';
        break;
      default:
        break;
    }

    return abbr;
  }
}
