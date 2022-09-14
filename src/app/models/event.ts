import { IAssetTypeEnum } from 'src/app/models/asset_type';
import { ITransaction } from 'src/app/models/transaction';

export type EventType = IEvent | undefined;

export interface IEvent {
  uuid: string;
  movement: IEventMovementEnum;
  transaction?: ITransaction;
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
