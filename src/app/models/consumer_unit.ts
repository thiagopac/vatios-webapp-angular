import { ICity } from 'src/app/models/city';

export type ConsumerUnitType = IConsumerUnit | undefined;

export interface IConsumerUnit {
  uuid: string;
  name: string;
  code: string;
  address: string;
  number: string;
  type: string;
  created_at: Date;
  updated_at: Date;
  city: ICity;
}
