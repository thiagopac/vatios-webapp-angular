import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

export interface invoiceObj {
  due_date: string;
  address: string;
  uc: string;
  value: string;
  invoice: string;
  status: string;
}

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
})
export class HistoryComponent implements OnInit {
  dataSource: MatTableDataSource<invoiceObj>;
  displayedColumns: string[] = [
    'due_date',
    'address',
    'uc',
    'value',
    'invoice',
    'status',
  ];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor() {}

  ngOnInit(): void {
    const result = [
      {
        due_date: 'Maio 10, 2022',
        address: 'Rua Dr. Júlio Otaviano Ferreira, 1048, Belo Horizonte/MG',
        uc: '1/1111111111-1',
        value: 'R$ 746,70',
        invoice:
          'https://www.energisa.com.br/PublishingImages/imagens-conta/LIS_Frente.png',
        status: 'Em aberto',
      },
      {
        due_date: 'Abr 10, 2022',
        address: 'Rua Dr. Júlio Otaviano Ferreira, 1048, Belo Horizonte/MG',
        uc: '1/1111111111-1',
        value: 'R$ 746,70',
        invoice:
          'https://www.energisa.com.br/PublishingImages/imagens-conta/LIS_Frente.png',
        status: 'Em aberto',
      },
      {
        due_date: 'Abr 10, 2022',
        address: 'Rua Dr. Júlio Otaviano Ferreira, 1048, Belo Horizonte/MG',
        uc: '1/1111111111-1',
        value: 'R$ 746,70',
        invoice:
          'https://www.energisa.com.br/PublishingImages/imagens-conta/LIS_Frente.png',
        status: 'Em aberto',
      },
      {
        due_date: 'Abr 10, 2022',
        address: 'Rua Dr. Júlio Otaviano Ferreira, 1048, Belo Horizonte/MG',
        uc: '1/1111111111-1',
        value: 'R$ 746,70',
        invoice:
          'https://www.energisa.com.br/PublishingImages/imagens-conta/LIS_Frente.png',
        status: 'Em aberto',
      },
      {
        due_date: 'Abr 10, 2022',
        address: 'Rua Dr. Júlio Otaviano Ferreira, 1048, Belo Horizonte/MG',
        uc: '1/1111111111-1',
        value: 'R$ 746,70',
        invoice:
          'https://www.energisa.com.br/PublishingImages/imagens-conta/LIS_Frente.png',
        status: 'Em aberto',
      },
      {
        due_date: 'Abr 10, 2022',
        address: 'Rua Dr. Júlio Otaviano Ferreira, 1048, Belo Horizonte/MG',
        uc: '1/1111111111-1',
        value: 'R$ 746,70',
        invoice:
          'https://www.energisa.com.br/PublishingImages/imagens-conta/LIS_Frente.png',
        status: 'Em aberto',
      },
    ];

    this.dataSource = new MatTableDataSource(result);
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
