import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-statement-cell-component',
  templateUrl: './statement-cell.component.html',
  styleUrls: ['./statement-cell.component.scss'],
})
export class StatementCellComponent implements OnInit {
  @Input() cellValue: string;
  @Input() cellAsset: string;
  @Input() cellMovement: string;

  cellDescription: string;
  cellValueColor: string;
  cellValueSymbol: string;

  constructor() {}

  ngOnInit(): void {
    if (this.cellMovement === 'outgoing') {
      this.cellDescription = `Saída de ${this.cellAsset}`;
      this.cellValueColor = 'danger';
      this.cellValueSymbol = '-';
    } else {
      this.cellDescription = `Entrada de ${this.cellAsset}`;
      this.cellValueColor = 'success';
      this.cellValueSymbol = '+';
    }
  }
}
