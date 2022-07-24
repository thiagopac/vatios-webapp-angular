import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import {
  GeneralService,
  WalletFiduciaryValuesType,
} from 'src/app/services/general.service';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.scss'],
})
export class WalletComponent implements OnInit, OnDestroy {
  private unsubscribe: Subscription[] = [];
  assetsFiatValues$: Observable<WalletFiduciaryValuesType>;

  constructor(private generalService: GeneralService) {}

  ngOnInit(): void {
    this.assetsFiatValues$ = this.generalService.getAssetsFiduciaryValues();
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
