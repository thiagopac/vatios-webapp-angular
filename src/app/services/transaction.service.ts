import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/modules/auth';
import { TransactionType } from 'src/app/models/transaction';

const API_TRANSACTION_URL = `${environment.apiUrl}/transactions`;

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  createTransactionOperationEnergyToCrypto(
    value: number
  ): Observable<TransactionType> {
    return this.http.post<TransactionType>(
      `${API_TRANSACTION_URL}/energy-to-crypto`,
      { value },
      {
        headers: this.authService.headerSigned(),
      }
    );
  }

  createTransactionOperationFiatToCrypto(
    value: number
  ): Observable<TransactionType> {
    return this.http.post<TransactionType>(
      `${API_TRANSACTION_URL}/fiat-to-crypto`,
      { value },
      {
        headers: this.authService.headerSigned(),
      }
    );
  }

  createTransactionOperationCryptoToFiat(
    value: number
  ): Observable<TransactionType> {
    return this.http.post<TransactionType>(
      `${API_TRANSACTION_URL}/crypto-to-fiat`,
      { value },
      {
        headers: this.authService.headerSigned(),
      }
    );
  }

  createTransactionOperationWithdrawFiat(
    value: number
  ): Observable<TransactionType> {
    return this.http.post<TransactionType>(
      `${API_TRANSACTION_URL}/withdraw-fiat`,
      { value },
      {
        headers: this.authService.headerSigned(),
      }
    );
  }
}
