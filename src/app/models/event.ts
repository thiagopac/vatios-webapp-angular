import { IAssetTypeEnum } from 'src/app/models/asset_type';

export interface IEvent {
  uuid: string;
  movement: IEventMovementEnum;
  asset: IAssetTypeEnum;
  value: number;
  status: IEventStatusEnum;
  properties?: string;
  result?: string;
  created_at: Date;
  updated_at: Date;
}

export enum IEventMovementEnum {
  outgoing = 'outgoing',
  incoming = 'incoming',
}

export enum IEventStatusEnum {
  locked = 'locked',
  canceled = 'canceled',
  fail = 'fail',
  success = 'success',
  awaitingRun = 'awaiting-run',
  running = 'running',
}
