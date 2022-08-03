import { IAssetTypeEnum } from "src/app/models/asset_type";

export interface IExchangeRate {
  uuid: string;
  source: IAssetTypeEnum;
  target: IAssetTypeEnum;
  rate: number;
  created_at: Date;
  updated_at: Date;
}
