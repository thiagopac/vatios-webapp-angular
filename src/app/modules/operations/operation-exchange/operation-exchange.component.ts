import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChange,
} from '@angular/core';

@Component({
  selector: 'app-operation-exchange-component',
  templateUrl: './operation-exchange.component.html',
  styleUrls: ['./operation-exchange.component.scss'],
})
export class OperationExchangeComponent implements OnInit {
  @Input() firstInputLabel: string;
  @Input() firstInputAsset: string;
  @Input() firstInputMin: number;
  @Input() firstInputMax: number;
  @Input() firstInputDecimals: number;

  @Input() secondInputLabel: string;
  @Input() secondInputAsset: string;
  @Input() secondInputDecimals: number;

  @Input() operationRatio: number;
  @Input() icon: string;
  @Input() iconColor: string;
  @Input() themeColor: string;

  @Input() actionLabel: string;

  maxAllowed: number;
  firstInput: number;
  secondInput: number;
  secondInputStr: string;

  firstInputMinInt: number;

  @Output() triggeredAction = new EventEmitter();

  constructor() {}

  ngOnInit(): void {
    if (this.firstInputDecimals)
      this.firstInputMax = this.firstInputMax / 10 ** this.firstInputDecimals;
    this.firstInputMinInt = this.firstInputMin;
    this.maxAllowed = this.firstInputMax;
    this.firstInput =
      this.firstInputMin < this.maxAllowed
        ? this.firstInputMin
        : this.maxAllowed;
    this.updateAllInputStr();
  }

  updateFirstInput(value: number = 0): void {
    this.firstInput += value;
    this.firstInput =
      this.firstInput <= this.maxAllowed ? this.firstInput : this.maxAllowed;
    this.updateAllInputStr();
  }

  updateAllInputStr(): void {
    this.secondInput = this.firstInput * this.operationRatio;
    this.secondInputStr = this.secondInput
      .toFixed(this.secondInputDecimals)
      .toString()
      .replace('.', ',');
  }

  actionBtnClick(): void {
    this.triggeredAction.emit(this.firstInput);
  }

  checkInvalidInput(): boolean {
    return this.firstInputMin <= this.firstInput &&
      this.firstInput <= this.firstInputMax
      ? false
      : true;
  }
}
