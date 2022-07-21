import { ICity } from 'src/app/models/city';
import { AuthModel } from './auth';

export interface IUserModel {
  uuid: string;
  email: string;
  password: string;
  created_at: Date;
  updated_at: Date;
  info: IInfo;
}

export interface IInfo {
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

export class UserModel extends AuthModel implements IUserModel {
  public uuid: string;
  public email: string;
  public password: string;
  public info: IInfo;
  created_at: Date;
  updated_at: Date;

  setUser(_user: unknown) {
    const user = _user as UserModel;
    this.uuid = user.uuid;
    this.email = user.email || '';
    this.password = user.password || '';
    this.created_at = user.created_at || '';
    this.updated_at = user.updated_at || '';
  }
}
