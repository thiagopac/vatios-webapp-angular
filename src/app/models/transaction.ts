import { IEvent } from './event';

export interface ITransaction {
  uuid: string;
  type: string;
  status: string;
  created_at: Date;
  updated_at: Date;
  events?: IEvent[];
}
