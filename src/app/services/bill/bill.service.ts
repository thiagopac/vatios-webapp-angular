import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/modules/auth';
import { IConsumerUnit } from 'src/app/models/consumer_unit';

const API_BILL_URL = `${environment.apiUrl}/bill`;

export type ConsumerUnit = IConsumerUnit | undefined;

@Injectable({
  providedIn: 'root',
})
export class BillService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  getUserConsumerUnits(): Observable<ConsumerUnit[]> {
    return this.http.get<ConsumerUnit[]>(`${API_BILL_URL}/ownership`, {
      headers: this.authService.headerSigned(),
    });
  }

  createConsumerUnit(consumerUnt: ConsumerUnit): Observable<ConsumerUnit> {
    return this.http.post<ConsumerUnit>(`${API_BILL_URL}/ownership`, consumerUnt, {
      headers: this.authService.headerSigned(),
    });
  }

  updateConsumerUnit(consumerUnt: ConsumerUnit): Observable<ConsumerUnit> {
    return this.http.put<ConsumerUnit>(`${API_BILL_URL}/ownership/${consumerUnt?.uuid}`, consumerUnt, {
      headers: this.authService.headerSigned(),
    });
  }
  
  deleteConsumerUnit(consumerUnt: ConsumerUnit): Observable<ConsumerUnit> {
    return this.http.delete<ConsumerUnit>(`${API_BILL_URL}/ownership/${consumerUnt?.uuid}`, {
      headers: this.authService.headerSigned(),
    });
  }
  
}
