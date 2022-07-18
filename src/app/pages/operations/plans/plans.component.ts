import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-plans',
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.scss'],
})
export class PlansComponent implements OnInit {
  input: number = 100;

  firstPlanTokenPrice: number = 0.9;
  firstPlanTotal: string;

  secondPlanTokenPrice: number = 0.88;
  secondPlanTotal: string;

  thirPlanTokenPrice: number = 0.86;
  thirdPlanTotal: string;

  constructor() {
    this.input = 100;
  }

  ngOnInit(): void {
    this.updateAllTotals();
  }

  updateAllTotals() {
    this.firstPlanTotal = (this.input * this.firstPlanTokenPrice)
      .toFixed(2)
      .toString()
      .replace('.', ',');
    this.secondPlanTotal = (this.input * this.secondPlanTokenPrice)
      .toFixed(2)
      .toString()
      .replace('.', ',');
    this.thirdPlanTotal = (this.input * this.thirPlanTokenPrice)
      .toFixed(2)
      .toString()
      .replace('.', ',');
  }
}
