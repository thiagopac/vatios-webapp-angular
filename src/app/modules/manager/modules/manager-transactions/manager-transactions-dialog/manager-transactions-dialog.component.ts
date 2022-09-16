import { AlertMessageService } from 'src/app/services/alert-message.service';
import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { TransactionType } from 'src/app/models/transaction';
import { EventType, IEvent } from 'src/app/models/event';
import { ManagerService } from 'src/app/services/manager.service';
import { SocketService } from 'src/app/services/socket.service';

@Component({
  selector: 'app-manager-transactions-dialog',
  templateUrl: './manager-transactions-dialog.component.html',
  styleUrls: ['./manager-transactions-dialog.component.scss'],
})
export class ManagerTransactionsDialogComponent implements OnInit, OnDestroy {
  private unsubscribe: Subscription[] = [];
  private sub: Subscription;
  transaction: TransactionType;
  events: EventType[] | undefined;
  isLoading: boolean;
  indexRowLoading: number;

  constructor(
    private dialogRef: MatDialogRef<ManagerTransactionsDialogComponent>,
    private alertMessageService: AlertMessageService,
    private managerService: ManagerService,
    private socketService: SocketService,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) {}

  ngOnInit(): void {
    if (this.data && this.data.transaction) {
      this.transaction = this.data.transaction;
      this.events = this.transaction!.events;
    }

    this.socketService.onEventFinished().subscribe((data: any) => {
      this.isLoading = false;
      this.indexRowLoading = 9999;
      this.loadEvents(this.transaction);
      this.alertMessageService.showToast(
        `O evento ${data.event.uuid} foi processado com sucesso!`,
        'success'
      );
    });
  }

  loadEvents(transaction: TransactionType) {
    this.sub = this.managerService
      .listEvents(transaction!.uuid)
      .subscribe((events) => {
        this.events = events;
      });
  }

  approveTransaction() {
    this.sub = this.managerService
      .approveTransaction(this.transaction!.uuid)
      .subscribe((transaction) => {
        this.alertMessageService.showAlert('Transação aprovada', 'success');
        this.dialogRef.close();
      });
  }

  disapproveTransaction() {
    this.sub = this.managerService
      .disapproveTransaction(this.transaction!.uuid)
      .subscribe((transaction) => {
        this.alertMessageService.showAlert('Transação reprovada', 'success');
        this.dialogRef.close();
      });
  }

  indexRowLoadingChange(index: number) {
    this.indexRowLoading = index;
  }

  runEventWebsocket(event: IEvent) {
    this.isLoading = true;
    this.alertMessageService.showToast('Evento em processamento!', 'info');
    this.socketService.runEvent(event);
  }

  runEvent(event: IEvent) {
    this.isLoading = true;
    this.alertMessageService.showToast('Evento em processamento!', 'info');
    this.sub = this.managerService.runEvent(event.uuid).subscribe(() => {
      this.isLoading = false;
      this.alertMessageService.showToast(
        'Evento processado com sucesso!',
        'success'
      );
      this.loadEvents(this.transaction);
    });
  }

  close() {
    this.dialogRef.close();
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
