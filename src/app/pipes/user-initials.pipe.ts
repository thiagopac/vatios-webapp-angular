import { IUserModel } from 'src/app/models/user';
import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'userInitials',
})
@Injectable({
  providedIn: 'root',
})
export class UserInitialsPipe implements PipeTransform {
  transform(user: IUserModel): string {
    return `${user.info.first_name.charAt(0)}${user.info.last_name.charAt(0)}`;
  }
}
