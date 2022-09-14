import { BillService } from 'src/app/services/bill.service';
import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { IPayBill, inits } from 'src/app/models/pay_bill.helper';
import {
  IPaymentStatusEnum,
  IUserInvoiceCompensationDetails,
  UserInvoiceType,
} from 'src/app/models/user_invoice';
import { BalanceType } from 'src/app/models/balance';
import { ConsumerUnitType } from 'src/app/models/consumer_unit';

@Component({
  selector: 'app-wizard-bill-pay',
  templateUrl: './wizard.component.html',
})
export class WizardComponent implements OnInit, OnDestroy {
  formsCount = 6;
  payBill$: BehaviorSubject<IPayBill> = new BehaviorSubject<IPayBill>(inits);
  currentStep$: BehaviorSubject<number> = new BehaviorSubject(1);
  isCurrentFormValid$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  balance$: Observable<BalanceType>;
  consumerUnits$: Observable<ConsumerUnitType[]>;
  invoices$: Observable<UserInvoiceType[]>;
  invoiceCompensationDetails$: Observable<IUserInvoiceCompensationDetails>;

  private unsubscribe: Subscription[] = [];
  updatedProcess: IPayBill;

  constructor(
    private billService: BillService,
    private changeDetector: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    //FORÇAR PASSO INICIAL
    this.currentStep$ = new BehaviorSubject(1);
    this.getDataForStep(1);
  }

  getDataForStep(step: number) {
    switch (step) {
      case 1:
        this.consumerUnits$ = this.billService.getUserConsumerUnits();
        break;
      case 2:
        this.invoices$ =
          this.billService.getUserInvoicesForConsumerUnitWithPaymentStatus(
            this.updatedProcess.consumerUnit?.uuid!,
            IPaymentStatusEnum.paymentPending
          );
        break;
      case 3:
        this.invoiceCompensationDetails$ =
          this.billService.getUserInvoiceCompensationDetails(
            this.updatedProcess.userInvoice?.uuid!
          );
        break;
      default:
        break;
    }
  }

  doesStepHaveInput(step: number):boolean {
    return (step === 1 || step === 2 || step === 5) ? true : false;
  }

  updateProcess = (part: Partial<IPayBill>, currentStep: number) => {
    console.log('part:', part);

    const process = this.payBill$.value;
    this.updatedProcess = { ...process, ...part };
    this.payBill$.next(this.updatedProcess);
    this.isCurrentFormValid$.next(true);

    this.getDataForStep(currentStep + 1);
  };

  nextStep() {
    this.isCurrentFormValid$.next(false);
    const nextStep = this.currentStep$.value + 1;
    this.isCurrentFormValid$.next(!this.doesStepHaveInput(nextStep));
    if (nextStep > this.formsCount) {
      return;
    }
    this.currentStep$.next(nextStep);
  }

  prevStep() {
    const prevStep = this.currentStep$.value - 1;
    this.isCurrentFormValid$.next(!this.doesStepHaveInput(prevStep));
    if (prevStep === 0) {
      return;
    }
    this.currentStep$.next(prevStep);
  }

  finished() {
    this.billService.createPayment(this.updatedProcess).subscribe((res) => {
      this.nextStep();
      this.changeDetector.detectChanges();
    })
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
