import { IUserModel } from 'src/app/models/user';
import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'userFullname',
})
@Injectable({
  providedIn: 'root',
})
export class UserFullnamePipe implements PipeTransform {
  transform(user: IUserModel): string {
    return `${user.first_name} ${user.last_name}`;
  }
}
