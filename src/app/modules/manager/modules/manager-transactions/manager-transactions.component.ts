import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { AdminAuthService, AdminType } from 'src/app/modules/admin-auth';
import { MatTableDataSource } from '@angular/material/table';
import { ManagerService } from 'src/app/services/manager.service';
import { FlatObjectPipe } from 'src/app/pipes/flat-object.pipe';
import { DatePipe } from '@angular/common';
import { MatPaginator } from '@angular/material/paginator';
import { FriendlyTransactionStatusPipe } from 'src/app/pipes/friendly-transaction-status.pipe';
import { FriendlyTransactionDescriptionPipe } from 'src/app/pipes/friendly-transaction-description.pipe';
import { TransactionType } from 'src/app/models/transaction';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { auto } from '@popperjs/core';
import { ManagerTransactionsDialogComponent } from 'src/app/modules/manager/modules/manager-transactions/manager-transactions-dialog/manager-transactions-dialog.component';

@Component({
  selector: 'app-manager-transactions',
  templateUrl: './manager-transactions.component.html',
  styleUrls: ['./manager-transactions.component.scss'],
})
export class ManagerTransactionsComponent implements OnInit, OnDestroy {
  admin$: Observable<AdminType>;

  dataSource: MatTableDataSource<TransactionType>;
  displayedColumns: string[] = [
    'uuid',
    'type',
    'recipient',
    'count_events',
    'status',
    'created_at',
  ];

  flattenedObjects: any[] = [];

  private unsubscribe: Subscription[] = [];
  private sub: Subscription;

  refreshTransactions = new BehaviorSubject<boolean>(true);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private adminAuth: AdminAuthService,
    private managerService: ManagerService,
    private datePipe: DatePipe,
    private flatObjectPipe: FlatObjectPipe,
    private friendlyTransactionDescriptionPipe: FriendlyTransactionDescriptionPipe,
    private friendlyTransactionStatusPipe: FriendlyTransactionStatusPipe,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.admin$ = this.adminAuth.currentAdminUserSubject.asObservable();
    this.getTransactions();
  }

  getTransactions() {
    this.flattenedObjects = [];

    this.sub = this.managerService
      .getTransactions(0)
      .subscribe((transactions) => {
        transactions.map((transaction) => {
          let transactionAny: any = {};

          //transformations for the search to work properly
          transactionAny = this.flatObjectPipe.transform(transaction);
          transactionAny.transaction = transaction;

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

  openDialog(element: any) {
    const dialogConfig = new MatDialogConfig();
    // dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.height = auto;
    dialogConfig.width = '50%';

    dialogConfig.data = {
      transaction: element.transaction,
    };

    const dialogRef = this.dialog.open(
      ManagerTransactionsDialogComponent,
      dialogConfig
    );
    dialogRef.afterClosed().subscribe(() => this.getTransactions());
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
