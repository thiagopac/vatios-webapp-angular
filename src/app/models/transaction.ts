import { IUser } from 'src/app/models/user';
import { IEvent } from './event';

export type TransactionType = ITransaction | undefined;

export interface ITransaction {
  uuid: string;
  type: ITransactionTypeEnum;
  status: ITransactionStatusEnum;
  created_at: Date;
  updated_at: Date;
  events?: IEvent[];
  user?: IUser;
}

export enum ITransactionTypeEnum {
  operationEnergyToCrypto = 'Operation - Energy to Crypto',
  operationFiatToCrypto = 'Operation - Fiat to Crypto',
  operationCryptoToFiat = 'Operation - Crypto to Fiat',
  operationWithdrawFiat = 'Operation - Withdraw Fiat',
  billPay = 'Bill - Pay',
}

export enum ITransactionStatusEnum {
  awaitingApproval = 'awaiting-approval',
  readyToProcess = 'ready-to-process',
  processing = 'processing',
  failed = 'failed',
  completed = 'completed',
  disapproved = 'disapproved',
}
