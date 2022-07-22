import { IUserModel } from 'src/app/models/user';
import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'userFullnamePipe',
})
@Injectable({
  providedIn: 'root',
})
export class UserFullnamePipe implements PipeTransform {
  transform(user: IUserModel): string {
    return `${user.info.first_name} ${user.info.last_name}`;
  }
}
