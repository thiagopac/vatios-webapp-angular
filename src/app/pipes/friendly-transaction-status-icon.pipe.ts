import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'friendlyTransactionStatusIconPipe',
})
@Injectable({
  providedIn: 'root',
})
export class FriendlyTransactionStatusIconPipe implements PipeTransform {
  transform(status: string): { icon: string; color: string } {
    let output: { icon: string; color: string } = { icon: '', color: '' };

    switch (status) {
      case 'awaiting-approval':
        output = {
          icon: '/assets/media/icons/duotune/arrows/arr014.svg',
          color: 'warning',
        };
        break;
      case 'completed':
        output = {
          icon: '/assets/media/icons/duotune/arrows/arr016.svg',
          color: 'success',
        };
        break;
      case 'processing':
        output = {
          icon: '/assets/media/icons/duotune/arrows/arr028.svg',
          color: 'primary',
        };
        break;
      case 'disapproved':
        output = {
          icon: '/assets/media/icons/duotune/arrows/arr015.svg',
          color: 'danger',
        };
        break;
      case 'failed':
        output = {
          icon: '/assets/media/icons/duotune/arrows/arr015.svg',
          color: 'danger',
        };
        break;
      case 'ready-to-process':
        output = {
          icon: '/assets/media/icons/duotune/arrows/arr027.svg',
          color: 'primary',
        };
        break;
      default:
        break;
    }

    return output;
  }
}
