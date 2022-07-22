import { AlertMessageService } from './../../../../services/alert-message.service';
import {
  ConsumerUnitType,
  BillService,
} from 'src/app/services/bill/bill.service';
import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  LocationService,
  StateType,
  CityType,
} from 'src/app/services/location/location.service';
import { Observable, Subscription } from 'rxjs';
import { NgSelectConfig } from '@ng-select/ng-select';

@Component({
  selector: 'app-consumer-unit-dialog',
  templateUrl: './consumer-unit-dialog.component.html',
  styleUrls: ['./consumer-unit-dialog.component.scss'],
})
export class ConsumerUnitDialogComponent implements OnInit, OnDestroy {
  fg: FormGroup;
  consumerUnit: ConsumerUnitType;

  states$: Observable<StateType[]>;
  cities$: Observable<CityType[]>;

  private unsubscribe: Subscription[] = [];
  private sub: Subscription;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ConsumerUnitDialogComponent>,
    private locationService: LocationService,
    private config: NgSelectConfig,
    private billService: BillService,
    private alertMessageService: AlertMessageService,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) {
    this.config.notFoundText = 'Nenhum registro encontrado';
    this.config.appendTo = 'body';
  }

  ngOnInit(): void {
    this.states$ = this.locationService.getStates();

    this.consumerUnit = this.data.consumerUnit;
    this.buildFormGroup();

    if (this.data && this.data.consumerUnit) {
      const state_id = this.data.consumerUnit.city.state_id;
      this.data.consumerUnit.state_id = state_id;
      this.cities$ = this.locationService.getCitiesByState(state_id);

      this.fg.patchValue(this.data.consumerUnit);
    }
  }

  buildFormGroup() {
    this.fg = this.fb.group({
      uuid: [null],
      name: [null, [Validators.required, Validators.maxLength(30)]],
      code: [null, [Validators.required]],
      address: [null, [Validators.required, Validators.maxLength(255)]],
      number: [null, [Validators.required, Validators.maxLength(10)]],
      type: [null, [Validators.required]],
      state_id: [null, [Validators.required]],
      city_id: [null, [Validators.required]],
    });
  }

  selectedState(event: any) {
    this.cities$ = this.locationService.getCitiesByState(event.letter);
  }

  submit() {
    const filledConsumerUnit: ConsumerUnitType = this.fg.value;

    if (filledConsumerUnit?.uuid) {
      this.sub = this.billService
        .updateConsumerUnit(filledConsumerUnit)
        .subscribe(() => {
          this.fg.reset();
          this.close();
          this.alertMessageService.showToast(
            'Unidade consumidora atualizada com sucesso!',
            'success'
          );
        });
    } else {
      this.sub = this.billService
        .createConsumerUnit(filledConsumerUnit)
        .subscribe(() => {
          this.fg.reset();
          this.close();
          this.alertMessageService.showToast(
            'Unidade consumidora criada com sucesso!',
            'success'
          );
        });
    }

    this.unsubscribe.push(this.sub);
  }

  close() {
    this.dialogRef.close();
  }

  save() {
    this.dialogRef.close();
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
