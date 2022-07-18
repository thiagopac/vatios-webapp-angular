import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-operation-withdraw-component',
  templateUrl: './operation-withdraw.component.html',
  styleUrls: ['./operation-withdraw.component.scss'],
})
export class OperationWithdrawComponent implements OnInit {
  @Input() inputLabel: string;
  @Input() inputAsset: string;
  @Input() inputMin: number;
  @Input() inputMax: number;
  @Input() inputMask: string;

  @Input() themeColor: string;
  @Input() actionLabel: string;

  maxAllowed: number;
  input: number;

  @Output() triggeredAction = new EventEmitter();

  constructor() {}

  ngOnInit(): void {
    this.inputMin = this.currencyIntToCurrencyFloat(this.inputMin);
    this.inputMax = this.currencyIntToCurrencyFloat(this.inputMax);
    this.maxAllowed = this.inputMax;
  }

  updateInput(value: number = 0) {
    this.input = (this.input ?? 0) + value;
    this.input = this.input <= this.maxAllowed ? this.input : this.maxAllowed;
  }

  actionBtnClick(): void {
    this.triggeredAction.emit(this.currencyFloatToCurrencyInt(this.input));
  }

  checkInvalidInput(): boolean {
    return this.inputMin <= this.input && this.input <= this.inputMax
      ? false
      : true;
  }

  currencyIntToCurrencyFloat(value: number): number {
    return value / 100;
  }

  currencyFloatToCurrencyInt(value: number): number {
    return value * 100;
  }
}
