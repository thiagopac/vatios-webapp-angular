import { ICity } from 'src/app/models/city';

export interface IAdmin {
  uuid: string;
  email: string;
  password: string;
  created_at: Date;
  updated_at: Date;
  info: IAdminInfo;
}

export interface IAdminInfo {
  uuid: string;
  first_name: string;
  last_name: string;
  phone: string;
  city_id: string;
  created_at: Date;
  updated_at: Date;
  city: ICity;
}
