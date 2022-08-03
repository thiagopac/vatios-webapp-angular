import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AdminType } from 'src/app/modules/admin-auth';
import { AdminAuthService } from 'src/app/services/admin-auth';

@Component({
  selector: 'app-home',
  templateUrl: './management-home.component.html',
  styleUrls: ['./management-home.component.scss']
})
export class ManagementHomeComponent implements OnInit {

  admin$: Observable<AdminType>;
  date: Date;

  constructor(
    private adminAuth: AdminAuthService
    ) {}

  ngOnInit(): void {
    this.admin$ = this.adminAuth.currentAdminUserSubject.asObservable();
    this.date = new Date();
  }

}
