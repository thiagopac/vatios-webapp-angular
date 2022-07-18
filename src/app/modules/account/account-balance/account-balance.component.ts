import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-account-balance-component',
  templateUrl: './account-balance.component.html',
  styleUrls: ['./account-balance.component.scss'],
})
export class AccountBalanceComponent implements OnInit {
  @Input() energyAssetValue: number;
  @Input() cryptoAssetValue: number;
  @Input() fiatAssetValue: number;

  constructor() {}

  ngOnInit(): void {}
}
