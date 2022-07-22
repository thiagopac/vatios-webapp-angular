import { AlertMessageService } from 'src/app/services/alert-message.service';
import { Observable, BehaviorSubject, switchMap } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import {
  BillService,
  ConsumerUnitType,
} from 'src/app/services/bill/bill.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ConsumerUnitDialogComponent } from 'src/app/pages/bill/ownership/consumer-unit-dialog/consumer-unit-dialog.component';
import { auto } from '@popperjs/core';

@Component({
  selector: 'app-ownership',
  templateUrl: './ownership.component.html',
  styleUrls: ['./ownership.component.scss'],
})
export class OwnershipComponent implements OnInit {
  consumerUnits$: Observable<ConsumerUnitType[]>;
  refreshConsumerUnits = new BehaviorSubject<boolean>(true);

  constructor(
    private billService: BillService,
    private alertMessageService: AlertMessageService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.consumerUnits$ = this.refreshConsumerUnits.pipe(
      switchMap((_) => this.billService.getUserConsumerUnits())
    );
  }

  openDialog(element: ConsumerUnitType = undefined) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.height = auto;
    dialogConfig.width = '550px';

    dialogConfig.data = {
      consumerUnit: element,
    };

    const dialogRef = this.dialog.open(
      ConsumerUnitDialogComponent,
      dialogConfig
    );
    dialogRef
      .afterClosed()
      .subscribe(() => this.refreshConsumerUnits.next(true));
  }

  deleteConsumerUnit(element: ConsumerUnitType) {
    this.billService.deleteConsumerUnit(element).subscribe(() => {
      this.alertMessageService.showToast(
        'Unidade consumidora apagada com sucesso',
        'success'
      );
      this.refreshConsumerUnits.next(true);
    });
  }

  deleteConfirmation(element: ConsumerUnitType) {
    this.alertMessageService.alertWithHandler(
      'Tem certeza de que deseja apagar esta Unidade consumidora?',
      'error',
      () => this.deleteConsumerUnit(element)
    );
  }
}
