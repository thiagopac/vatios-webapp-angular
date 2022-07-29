import { IPaymentStatusEnum, IUserInvoice, IUserInvoiceCompensationDetails } from '../models/user_invoice';
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
    return this.http.get<UserInvoiceType[]>(`${API_BILL_URL}/invoices`, {
      headers: this.authService.headerSigned(),
    });
  }

  getUserInvoicesForConsumerUnitWithPaymentStatus(consumerUnit: string, paymentStatus: IPaymentStatusEnum): Observable<UserInvoiceType[]> {
    return this.http.get<UserInvoiceType[]>(`${API_BILL_URL}/invoices/consumer-unit/${consumerUnit}/${paymentStatus}`, {
      headers: this.authService.headerSigned(),
    });
  }

  getUserInvoice(uuid: string): Observable<UserInvoiceType> {
    return this.http.get<UserInvoiceType>(`${API_BILL_URL}/invoices/${uuid}`, {
      headers: this.authService.headerSigned(),
    });
  }

  getUserInvoiceCompensationDetails(uuid: string): Observable<IUserInvoiceCompensationDetails> {
    return this.http.get<IUserInvoiceCompensationDetails>(`${API_BILL_URL}/invoice/compensation-details/${uuid}`, {
      headers: this.authService.headerSigned(),
    });
  }

}
