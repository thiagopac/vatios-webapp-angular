import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { ICreateAccount } from '../../create-account.helper';

@Component({
  selector: 'app-step2',
  templateUrl: './step2.component.html',
})
export class Step2Component implements OnInit, OnDestroy {
  @Input() updateParentModel: (
    part: Partial<ICreateAccount>,
    isFormValid: boolean
  ) => void;
  form: UntypedFormGroup;
  @Input() defaultValues: Partial<ICreateAccount>;

  private unsubscribe: Subscription[] = [];

  constructor(private fb: UntypedFormBuilder) {}

  ngOnInit() {
    this.initForm();
    this.updateParentModel({}, this.checkForm());
  }

  initForm() {
    this.form = this.fb.group({
      accountTeamSize: [
        this.defaultValues.accountTeamSize,
        [Validators.required],
      ],
      // accountName: [this.defaultValues.accountName, [Validators.required]],
      accountPlan: [this.defaultValues.accountPlan, [Validators.required]],
    });

    const formChangesSubscr = this.form.valueChanges.subscribe((val) => {
      this.updateParentModel(val, this.checkForm());
    });
    this.unsubscribe.push(formChangesSubscr);
  }

  checkForm() {
    return !this.form.get('accountName')?.hasError('required');
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
