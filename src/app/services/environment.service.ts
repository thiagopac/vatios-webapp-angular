import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EnvironmentService {
  public getHostUrl(): string {
    return environment.hostUrl;
  }

  public getVersion(): string {
    return environment.appVersion;
  }

  public getApiUrl(): string {
    return environment.apiUrl;
  }

  public getAdminAuthDataKey(): string {
    return environment.adminAuthDataKey;
  }

  public getAdminUserDataKey(): string {
    return environment.adminUserDataKey;
  }

  public getUserDataKey(): string {
    return environment.userDataKey;
  }

  public getBinanceExplorerUrl(): string {
    return environment.binanceExplorerUrl;
  }

  public getSmartContractAddress(): string {
    return environment.smartContractAddress;
  }

  public getTokenUserTransfersUrl(walletAddress: string): string {
    return `${this.getBinanceExplorerUrl()}/token/${this.getSmartContractAddress()}?a=${walletAddress}`;
  }

  public getTokenAllUsersTransfersUrl(): string {
    return `${this.getBinanceExplorerUrl()}/token/${this.getSmartContractAddress()}`;
  }

  public getTokenHolderChartUrl(): string {
    return `${this.getBinanceExplorerUrl()}/token/tokenholderchart/${this.getSmartContractAddress()}`;
  }

  public isCurrentDev(): boolean {
    return !environment.production;
  }

  public isCurrentProd(): boolean {
    return environment.production;
  }
}
