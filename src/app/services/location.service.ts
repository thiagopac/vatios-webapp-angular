import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IBalance } from 'src/app/models/balance';
import { IState } from 'src/app/models/state';
import { ICity } from 'src/app/models/city';
import { AuthService } from 'src/app/modules/auth';

const API_LOCATION_URL = `${environment.apiUrl}/location`;

export type StateType = IState | undefined;
export type CityType = ICity | undefined;

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  getStates(): Observable<StateType[]> {
    return this.http.get<StateType[]>(`${API_LOCATION_URL}/states`, {
      headers: this.authService.headerSigned(),
    });
  }

  getCitiesByState(state: any): Observable<CityType[]> {
    return this.http.get<CityType[]>(`${API_LOCATION_URL}/cities/${state}`, {
      headers: this.authService.headerSigned(),
    });
  }
}
