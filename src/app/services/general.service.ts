import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BalanceType } from 'src/app/models/balance';
import { ITransaction, TransactionType } from 'src/app/models/transaction';
import { WalletFiduciaryValuesType } from 'src/app/models/wallet.dto';
import { AuthService } from 'src/app/modules/auth';

const API_GENERAL_URL = `${environment.apiUrl}/general`;

@Injectable({
  providedIn: 'root',
})
export class GeneralService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  getUserBalance(): Observable<BalanceType> {
    return this.http.get<BalanceType>(`${API_GENERAL_URL}/balance`, {
      headers: this.authService.headerSigned(),
    });
  }

  getUserTransactions(page: number): Observable<TransactionType[]> {
    return this.http.get<TransactionType[]>(
      `${API_GENERAL_URL}/statement/${page}`,
      {
        headers: this.authService.headerSigned(),
      }
    );
  }

  getAssetsFiduciaryValues(): Observable<WalletFiduciaryValuesType> {
    return this.http.get<WalletFiduciaryValuesType>(
      `${API_GENERAL_URL}/wallet/assets-fiduciary-values`,
      {
        headers: this.authService.headerSigned(),
      }
    );
  }

  getUserLastTransactions(page: number): Observable<ITransaction[]> {
    return this.http.get<ITransaction[]>(
      `${API_GENERAL_URL}/wallet/last-transactions/${page}`,
      {
        headers: this.authService.headerSigned(),
      }
    );
  }
}
