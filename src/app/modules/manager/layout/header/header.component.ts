import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AdminAuthService } from 'src/app/services/admin-auth';
import { AdminType } from 'src/app/modules/admin-auth';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  admin$: Observable<AdminType>;

  constructor(private adminAuth: AdminAuthService) {}

  ngOnInit(): void {
    this.admin$ = this.adminAuth.currentAdminUserSubject.asObservable();
  }

  logout() {
    this.adminAuth.logout();
    document.location.reload();
  }
}
