import { ICity } from 'src/app/models/city';

export interface IUser {
  uuid: string;
  email: string;
  password: string;
  created_at: Date;
  updated_at: Date;
  info: IUserInfo;
}

export interface IUserInfo {
  uuid: string;
  first_name: string;
  last_name: string;
  phone: string;
  wallet_address: string;
  city_id: string;
  created_at: Date;
  updated_at: Date;
  city: ICity;
}
