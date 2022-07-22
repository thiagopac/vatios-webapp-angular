import { Subscription } from 'rxjs';
import { BillService, UserInvoiceType } from 'src/app/services/bill/bill.service';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

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

  invoices: UserInvoiceType[];

  private unsubscribe: Subscription[] = [];
  private sub: Subscription;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private billService: BillService
  ) {}

  ngOnInit(): void {
    
    this.sub = this.billService.getUserInvoices().subscribe(invoices => {
      this.invoices = invoices;
      this.fillTable(this.invoices);
    });
  }

  fillTable(invoices: UserInvoiceType[]) {
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
