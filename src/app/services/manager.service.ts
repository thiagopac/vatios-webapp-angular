import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { TransactionType } from 'src/app/models/transaction';
import { AdminAuthService, AdminType } from 'src/app/modules/admin-auth';
import { UserType } from 'src/app/modules/auth';
import { EventType } from 'src/app/models/event';

const API_MANAGER_URL = `${environment.apiUrl}/manager`;

@Injectable({
  providedIn: 'root',
})
export class ManagerService {
  constructor(
    private http: HttpClient,
    private adminAuthService: AdminAuthService
  ) {}

  getTransactions(page: number): Observable<TransactionType[]> {
    return this.http.get<TransactionType[]>(
      // `${API_GENERAL_URL}/transactions/list${page}`,
      `${API_MANAGER_URL}/transactions/list`,
      {
        headers: this.adminAuthService.headerSigned(),
      }
    );
  }

  getUsers(page: number): Observable<UserType[]> {
    return this.http.get<UserType[]>(`${API_MANAGER_URL}/users/list`, {
      headers: this.adminAuthService.headerSigned(),
    });
  }

  getAdmins(page: number): Observable<AdminType[]> {
    return this.http.get<AdminType[]>(`${API_MANAGER_URL}/admins/list`, {
      headers: this.adminAuthService.headerSigned(),
    });
  }

  approveTransaction(transaction: string): Observable<TransactionType> {
    return this.http.put<TransactionType>(
      `${API_MANAGER_URL}/transactions/approve`,
      { transaction },
      {
        headers: this.adminAuthService.headerSigned(),
      }
    );
  }

  disapproveTransaction(transaction: string): Observable<TransactionType> {
    return this.http.put<TransactionType>(
      `${API_MANAGER_URL}/transactions/disapprove`,
      { transaction },
      {
        headers: this.adminAuthService.headerSigned(),
      }
    );
  }

  listEvents(transaction: string): Observable<EventType[]> {
    return this.http.get<EventType[]>(
      // `${API_MANAGER_URL}/events/run`,
      `${API_MANAGER_URL}/events/list/${transaction}`,
      {
        headers: this.adminAuthService.headerSigned(),
      }
    );
  }

  runEvent(event: string): Observable<EventType> {
    return this.http.put<EventType>(
      `${API_MANAGER_URL}/events/run`,
      { event },
      {
        headers: this.adminAuthService.headerSigned(),
      }
    );
  }
}
