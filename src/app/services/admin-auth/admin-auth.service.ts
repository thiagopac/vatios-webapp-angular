import { EnvironmentService } from '../environment.service';
import { Injectable, OnDestroy } from '@angular/core';
import { Observable, BehaviorSubject, of, Subscription } from 'rxjs';
import { map, catchError, switchMap, finalize } from 'rxjs/operators';
import { IAdmin } from 'src/app/models/admin';
import { AuthModel, AuthRegisterModel } from 'src/app/models/auth';
import { AdminAuthHTTPService } from './admin-auth-http.service';
import { Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';

export type AdminType = IAdmin | undefined;

@Injectable({
  providedIn: 'root',
})
export class AdminAuthService implements OnDestroy {
  // private fields
  private unsubscribe: Subscription[] = [];
  private adminAuthLocalStorageToken = `${this.environmentService.getVersion()}-${this.environmentService.getAdminAuthDataKey()}`;
  private adminUserLocalStorageToken = `${this.environmentService.getVersion()}-${this.environmentService.getAdminUserDataKey()}`;

  // public fields
  currentAdminUser$: Observable<AdminType>;
  isLoading$: Observable<boolean>;
  currentAdminUserSubject: BehaviorSubject<AdminType>;
  isLoadingSubject: BehaviorSubject<boolean>;

  get currentAdminUserValue(): AdminType {
    return this.currentAdminUserSubject.value;
  }

  set currentAdminUserValue(user: AdminType) {
    this.currentAdminUserSubject.next(user);
  }

  constructor(
    private adminAuthHttpService: AdminAuthHTTPService,
    private router: Router,
    private environmentService: EnvironmentService
  ) {
    this.isLoadingSubject = new BehaviorSubject<boolean>(false);
    this.currentAdminUserSubject = new BehaviorSubject<AdminType>(undefined);
    this.currentAdminUser$ = this.currentAdminUserSubject.asObservable();
    this.isLoading$ = this.isLoadingSubject.asObservable();
  }

  headerSigned(): HttpHeaders {
    const auth = this.getAuthFromLocalStorage();
    return new HttpHeaders({ Authorization: `Bearer ${auth?.token}` });
  }

  // public methods
  login(email: string, password: string): Observable<AdminType> {
    this.isLoadingSubject.next(true);
    return this.adminAuthHttpService.login(email, password).pipe(
      map((auth: AuthModel) => {
        const result = this.setAuthFromLocalStorage(auth);
        return result;
      }),
      switchMap(() => this.getUserByToken()),
      catchError((err) => {
        console.error('err', err);
        return of(undefined);
      }),
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

  logout() {
    localStorage.removeItem(this.adminAuthLocalStorageToken);
    this.router.navigate(['/admin-auth/login'], {
      queryParams: {},
    });
  }

  getUserByToken(): Observable<AdminType> {
    const auth = this.getAuthFromLocalStorage();

    if (!auth || !auth.token) {
      return of(undefined);
    }

    this.isLoadingSubject.next(true);
    return this.adminAuthHttpService.getUserByToken(auth.token).pipe(
      map((user: AdminType) => {
        if (user) {
          this.setAdminFromLocalStorage(user);
          this.currentAdminUserSubject.next(user);
        } else {
          this.logout();
        }
        return user;
      }),
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

  // need create new user then login
  registration(user: AuthRegisterModel): Observable<any> {
    this.isLoadingSubject.next(true);
    return this.adminAuthHttpService.createUser(user).pipe(
      map(() => {
        this.isLoadingSubject.next(false);
      }),
      switchMap(() => this.login(user.email, user.password)),
      catchError((err) => {
        console.error('err', err);
        return of(undefined);
      }),
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

  // private methods
  private setAuthFromLocalStorage(auth: AuthModel): boolean {
    // store auth token/type/epiresIn in local storage to keep user logged in between page refreshes
    if (auth && auth.token) {
      localStorage.setItem(
        this.adminAuthLocalStorageToken,
        JSON.stringify(auth)
      );
      return true;
    }
    return false;
  }

  private setAdminFromLocalStorage(admin: AdminType): boolean {
    // store auth token/type/epiresIn in local storage to keep user logged in between page refreshes
    if (admin) {
      localStorage.setItem(
        this.adminUserLocalStorageToken,
        JSON.stringify(admin)
      );
      return true;
    }
    return false;
  }

  getAuthFromLocalStorage(): AuthModel | undefined {
    try {
      const lsValue = localStorage.getItem(this.adminAuthLocalStorageToken);
      if (!lsValue) {
        return undefined;
      }

      const authData = JSON.parse(lsValue);
      return authData;
    } catch (error) {
      console.error(error);
      return undefined;
    }
  }

  getAdminFromLocalStorage(): AdminType | undefined {
    try {
      const lsValue = localStorage.getItem(this.adminUserLocalStorageToken);
      if (!lsValue) {
        return undefined;
      }

      const authData = JSON.parse(lsValue);
      return authData;
    } catch (error) {
      console.error(error);
      return undefined;
    }
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
