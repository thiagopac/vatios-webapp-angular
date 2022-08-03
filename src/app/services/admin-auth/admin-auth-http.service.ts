import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AuthModel, AuthRegisterModel } from 'src/app/models/auth';
import { IAdmin } from 'src/app/models/admin';

const API_ADMIN_AUTH_URL = `${environment.apiUrl}/admin-auth`;

@Injectable({
  providedIn: 'root',
})
export class AdminAuthHTTPService {
  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<AuthModel> {
    return this.http.post<AuthModel>(`${API_ADMIN_AUTH_URL}/login`, {
      email,
      password,
    });
  }

  createUser(reg: AuthRegisterModel): Observable<IAdmin> {
    return this.http.post<IAdmin>(`${API_ADMIN_AUTH_URL}/register`, reg);
  }

  getUserByToken(token: string): Observable<IAdmin> {
    const httpHeaders = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get<IAdmin>(`${API_ADMIN_AUTH_URL}/me`, {
      headers: httpHeaders,
    });
  }
}
