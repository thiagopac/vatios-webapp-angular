import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/modules/auth';
import { IUser, IUserInfo } from 'src/app/models/user';

const API_USERS_URL = `${environment.apiUrl}/users`;

export type UserType = IUser | undefined;
export type InfoType = IUserInfo | undefined;

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  updateInfo(info: InfoType): Observable<InfoType> {
    return this.http.patch<InfoType>(`${API_USERS_URL}/info/update`, info, {
      headers: this.authService.headerSigned(),
    });
  }

  changePassword(passwords: {
    current_password: string;
    new_password: string;
    password_confirmation: string;
  }): Observable<UserType> {
    return this.http.patch<UserType>(
      `${API_USERS_URL}/change-password`,
      passwords,
      {
        headers: this.authService.headerSigned(),
      }
    );
  }
}
