import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { AdminAuthService, AdminType } from 'src/app/modules/admin-auth';
import { MatTableDataSource } from '@angular/material/table';
import { ManagementService } from 'src/app/services/management.service';
import { MatPaginator } from '@angular/material/paginator';
import { UserType } from 'src/app/modules/auth';

@Component({
  selector: 'app-management-admins',
  templateUrl: './management-admins.component.html',
  styleUrls: ['./management-admins.component.scss']
})
export class ManagementAdminsComponent implements OnInit, OnDestroy {

  admin$: Observable<AdminType>;

  dataSource: MatTableDataSource<UserType>;
  displayedColumns: string[] = [
    'uuid',
    'name',
    'email',
    'created_at',
  ];

  private unsubscribe: Subscription[] = [];
  private sub: Subscription;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private adminAuth: AdminAuthService,
    private managementService: ManagementService,
  ) {}

  ngOnInit(): void {
    this.admin$ = this.adminAuth.currentAdminUserSubject.asObservable();

    this.sub = this.managementService.getAdmins(0).subscribe((users) => {
      this.fillTable(users);
    });

    this.unsubscribe.push(this.sub);
  }

  fillTable(objects: any[]) {
    this.dataSource = new MatTableDataSource(objects);
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }

}
