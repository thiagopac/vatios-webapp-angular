import { Component, OnInit } from '@angular/core';
import { AdminAuthService } from 'src/app/services/admin-auth';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss'],
})
export class LogoutComponent implements OnInit {
  constructor(private adminAuthService: AdminAuthService) {
    this.adminAuthService.logout();
  }

  ngOnInit(): void {}
}
