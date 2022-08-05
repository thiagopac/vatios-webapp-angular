export type WalletFiduciaryValuesType = IWalletFiduciaryValuesDTO | undefined;

export interface IWalletFiduciaryValuesDTO {
  total: number;
  assets: IWalletFiduciaryValuesAsset[];
}

export interface IWalletFiduciaryValuesAsset {
  asset: string;
  balance: number;
  value: number;
}
