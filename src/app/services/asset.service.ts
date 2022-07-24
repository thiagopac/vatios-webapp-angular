import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/modules/auth';
import { IExchangeRate } from 'src/app/models/exchange_rate';

const API_LOCATION_URL = `${environment.apiUrl}/assets`;

export type ExchangeRateType = IExchangeRate | undefined;

@Injectable({
  providedIn: 'root',
})
export class AssetService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  getRates(): Observable<ExchangeRateType[]> {
    return this.http.get<ExchangeRateType[]>(`${API_LOCATION_URL}/rates`, {
      headers: this.authService.headerSigned(),
    });
  }

  getRateByPair(pair: string): Observable<ExchangeRateType> {
    return this.http.get<ExchangeRateType>(`${API_LOCATION_URL}/rate/${pair}`, {
      headers: this.authService.headerSigned(),
    });
  }
}
