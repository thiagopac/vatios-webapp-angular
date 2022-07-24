import { FriendlyInvoiceStatusPipe } from './../../../pipes/friendly-invoice-status.pipe';
import { FlatObjectPipe } from 'src/app/pipes/flat-object.pipe';
import { pipe, Subscription } from 'rxjs';
import { tap, mergeAll } from 'rxjs/operators';
import { BillService, UserInvoiceType } from 'src/app/services/bill.service';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
})
export class HistoryComponent implements OnInit, OnDestroy {
  dataSource: MatTableDataSource<UserInvoiceType>;
  displayedColumns: string[] = [
    'due_date',
    'address',
    'uc',
    'value',
    'invoice',
    'status',
  ];

  flattenedInvoices: any[] = [];

  private unsubscribe: Subscription[] = [];
  private sub: Subscription;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private billService: BillService,
    private flatObjectPipe: FlatObjectPipe,
    private friendlyInvoiceStatusPipe: FriendlyInvoiceStatusPipe,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.sub = this.billService.getUserInvoices().subscribe((invoices) => {
      invoices.map((invoice) => {
        let invoiceAny: any;
        //transformations for the search to work properly
        invoiceAny = this.flatObjectPipe.transform(invoice);
        invoiceAny.due_date = this.datePipe.transform(
          invoice!.due_date,
          'dd/MM/yyyy'
        );
        invoiceAny.payment = this.friendlyInvoiceStatusPipe.transform(
          invoice!.payment
        );
        this.flattenedInvoices.push(invoiceAny);
      });

      this.fillTable(this.flattenedInvoices);
    });

    this.unsubscribe.push(this.sub);
  }

  fillTable(invoices: any[]) {
    this.dataSource = new MatTableDataSource(invoices);
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
