import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IUser } from 'src/app/models/user';
import { environment } from '../../../environments/environment';
import { AuthModel, AuthRegisterModel } from 'src/app/models/auth';

const API_AUTH_URL = `${environment.apiUrl}/auth`;

@Injectable({
  providedIn: 'root',
})
export class AuthHTTPService {
  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post<AuthModel>(`${API_AUTH_URL}/login`, {
      email,
      password,
    });
  }

  createUser(reg: AuthRegisterModel): Observable<IUser> {
    return this.http.post<IUser>(`${API_AUTH_URL}/register`, reg);
  }

  // Server must check email => If email exists send link to the user and return true | If email doesn't exist return false
  forgotPassword(email: string): Observable<boolean> {
    return this.http.post<boolean>(`${API_AUTH_URL}/forgot-password`, {
      email,
    });
  }

  getUserByToken(token: string): Observable<IUser> {
    const httpHeaders = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get<IUser>(`${API_AUTH_URL}/me`, {
      headers: httpHeaders,
    });
  }
}
