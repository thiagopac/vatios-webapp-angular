import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { AdminAuthService, AdminType } from 'src/app/modules/admin-auth';
import { MatTableDataSource } from '@angular/material/table';
import { ManagementService } from 'src/app/services/management.service';
import { FlatObjectPipe } from 'src/app/pipes/flat-object.pipe';
import { DatePipe } from '@angular/common';
import { MatPaginator } from '@angular/material/paginator';
import { FriendlyTransactionStatusPipe } from 'src/app/pipes/friendly-transaction-status.pipe';
import { FriendlyTransactionDescriptionPipe } from 'src/app/pipes/friendly-transaction-description.pipe';
import { TransactionType } from 'src/app/models/transaction';

@Component({
  selector: 'app-management-transactions',
  templateUrl: './management-transactions.component.html',
  styleUrls: ['./management-transactions.component.scss'],
})
export class ManagementTransactionsComponent implements OnInit, OnDestroy {
  admin$: Observable<AdminType>;

  dataSource: MatTableDataSource<TransactionType>;
  displayedColumns: string[] = ['uuid', 'type', 'status', 'created_at'];

  flattenedObjects: any[] = [];

  private unsubscribe: Subscription[] = [];
  private sub: Subscription;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private adminAuth: AdminAuthService,
    private managementService: ManagementService,
    private datePipe: DatePipe,
    private flatObjectPipe: FlatObjectPipe,
    private friendlyTransactionDescriptionPipe: FriendlyTransactionDescriptionPipe,
    private friendlyTransactionStatusPipe: FriendlyTransactionStatusPipe
  ) {}

  ngOnInit(): void {
    this.admin$ = this.adminAuth.currentAdminUserSubject.asObservable();

    this.sub = this.managementService
      .getTransactions(0)
      .subscribe((transactions) => {
        transactions.map((transaction) => {
          let transactionAny: any = {};

          //transformations for the search to work properly
          transactionAny = this.flatObjectPipe.transform(transaction);
          transactionAny.transaction_uuid = transaction?.uuid;
          transactionAny.transaction_created_at = this.datePipe.transform(
            transaction!.created_at,
            'dd/MM/yyyy HH:mm:ss'
          );
          transactionAny.type =
            this.friendlyTransactionDescriptionPipe.transform(
              transaction!.type
            );
          transactionAny.status = this.friendlyTransactionStatusPipe.transform(
            transaction!.status
          );

          this.flattenedObjects.push(transactionAny);
        });

        this.fillTable(this.flattenedObjects);
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
