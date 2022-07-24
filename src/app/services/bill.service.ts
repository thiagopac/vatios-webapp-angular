import { IUserInvoice } from '../models/user_invoice';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/modules/auth';
import { IConsumerUnit } from 'src/app/models/consumer_unit';

const API_BILL_URL = `${environment.apiUrl}/bill`;

export type ConsumerUnitType = IConsumerUnit | undefined;
export type UserInvoiceType = IUserInvoice | undefined;

@Injectable({
  providedIn: 'root',
})
export class BillService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  getUserConsumerUnits(): Observable<ConsumerUnitType[]> {
    return this.http.get<ConsumerUnitType[]>(`${API_BILL_URL}/ownership`, {
      headers: this.authService.headerSigned(),
    });
  }

  createConsumerUnit(
    consumerUnt: ConsumerUnitType
  ): Observable<ConsumerUnitType> {
    return this.http.post<ConsumerUnitType>(
      `${API_BILL_URL}/ownership`,
      consumerUnt,
      {
        headers: this.authService.headerSigned(),
      }
    );
  }

  updateConsumerUnit(
    consumerUnt: ConsumerUnitType
  ): Observable<ConsumerUnitType> {
    return this.http.put<ConsumerUnitType>(
      `${API_BILL_URL}/ownership/${consumerUnt?.uuid}`,
      consumerUnt,
      {
        headers: this.authService.headerSigned(),
      }
    );
  }

  deleteConsumerUnit(
    consumerUnt: ConsumerUnitType
  ): Observable<ConsumerUnitType> {
    return this.http.delete<ConsumerUnitType>(
      `${API_BILL_URL}/ownership/${consumerUnt?.uuid}`,
      {
        headers: this.authService.headerSigned(),
      }
    );
  }

  getUserInvoices(): Observable<UserInvoiceType[]> {
    return this.http.get<UserInvoiceType[]>(`${API_BILL_URL}/invoice`, {
      headers: this.authService.headerSigned(),
    });
  }
}
