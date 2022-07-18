import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-asset-component',
  templateUrl: './asset.component.html',
  styleUrls: ['./asset.component.scss'],
})
export class AssetComponent implements OnInit {
  @Input() value: string;
  @Input() assetType: string;
  @Input() assetName: string;
  @Input() description: string;
  @Input() buttonText: string;
  @Input() buttonLink: string;

  constructor() {}

  ngOnInit(): void {}
}
