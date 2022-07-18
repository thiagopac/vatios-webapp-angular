import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-statement-balance-component',
  templateUrl: './statement-balance.component.html',
  styleUrls: ['./statement-balance.component.scss'],
})
export class StatementBalanceComponent implements OnInit {
  @Input() energyAssetValue: number;
  @Input() cryptoAssetValue: number;
  @Input() fiatAssetValue: number;

  constructor() {}

  ngOnInit(): void {}
}
