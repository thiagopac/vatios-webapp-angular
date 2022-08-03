import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { AdminAuthService } from './index';

@Injectable({ providedIn: 'root' })
export class AdminAuthGuard implements CanActivate {
  constructor(private adminAuthService: AdminAuthService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentAdminUser = this.adminAuthService.currentAdminUserValue;

    if (currentAdminUser) {
      // logged in so return true
      return true;
    }

    // not logged in so redirect to login page with the return url
    this.adminAuthService.logout();
    return false;
  }

}
