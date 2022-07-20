import { Observable, BehaviorSubject, switchMap } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { BillService, ConsumerUnit } from 'src/app/services/bill/bill.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ConsumerUnitDialogComponent } from 'src/app/pages/bill/ownership/consumer-unit-dialog/consumer-unit-dialog.component';
import { auto } from '@popperjs/core';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-ownership',
  templateUrl: './ownership.component.html',
  styleUrls: ['./ownership.component.scss'],
})
export class OwnershipComponent implements OnInit {

  consumerUnits$: Observable<ConsumerUnit[]>
  refreshConsumerUnits = new BehaviorSubject<boolean>(true);

  constructor(
    private billService: BillService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.consumerUnits$ = this.refreshConsumerUnits.pipe(switchMap(_ => this.billService.getUserConsumerUnits()));
  }
  
  openDialog(element: ConsumerUnit = undefined) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.height = auto;
    dialogConfig.width = '550px'

    dialogConfig.data = {
        consumerUnit: element
    };
    
    const dialogRef = this.dialog.open(ConsumerUnitDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(() => this.refreshConsumerUnits.next(true));
  }

  deleteConsumerUnit(element: ConsumerUnit) {

    this.billService.deleteConsumerUnit(element).subscribe(() => {
      Swal.fire(
        {
          text: 'Unidade consumidora apagda com sucesso',
          icon: 'success',
          confirmButtonText: 'OK',
          confirmButtonColor: '#31abcc'
        }
      )

      this.refreshConsumerUnits.next(true)
    });
  }

  deleteConfirmation(element: ConsumerUnit) {
    Swal.fire({
      text: 'Tem certeza de que deseja apagar esta Unidade consumidora?',
      icon: 'error',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Sim',
      confirmButtonColor: '#31abcc'

    }).then((result) => {
      if(result.isConfirmed ) this.deleteConsumerUnit(element);
    })
  }

}

