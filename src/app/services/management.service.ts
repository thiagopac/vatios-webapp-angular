import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { TransactionType } from 'src/app/models/transaction';
import { AdminAuthService, AdminType } from 'src/app/modules/admin-auth';
import { UserType } from 'src/app/modules/auth';

const API_GENERAL_URL = `${environment.apiUrl}/management`;

@Injectable({
  providedIn: 'root',
})
export class ManagementService {
  constructor(
    private http: HttpClient,
    private adminAuthService: AdminAuthService
  ) {}

  getTransactions(page: number): Observable<TransactionType[]> {
    return this.http.get<TransactionType[]>(
      // `${API_GENERAL_URL}/transactions/list${page}`,
      `${API_GENERAL_URL}/transactions/list`,
      {
        headers: this.adminAuthService.headerSigned(),
      }
    );
  }

  getUsers(page: number): Observable<UserType[]> {
    return this.http.get<UserType[]>(`${API_GENERAL_URL}/users/list`, {
      headers: this.adminAuthService.headerSigned(),
    });
  }

  getAdmins(page: number): Observable<AdminType[]> {
    return this.http.get<AdminType[]>(`${API_GENERAL_URL}/admins/list`, {
      headers: this.adminAuthService.headerSigned(),
    });
  }
}
