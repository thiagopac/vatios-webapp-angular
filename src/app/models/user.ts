import { AuthModel } from './auth';

export interface IUserModel {
  uuid: string;
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  created_at: Date;
  updated_at: Date;
}

export class UserModel extends AuthModel implements IUserModel {
  public uuid: string;
  public email: string;
  public password: string;
  public first_name: string;
  public last_name: string;
  created_at: Date;
  updated_at: Date;

  setUser(_user: unknown) {
    const user = _user as UserModel;
    this.uuid = user.uuid;
    this.email = user.email || '';
    this.password = user.password || '';
    this.first_name = user.first_name || '';
    this.last_name = user.last_name || '';
    this.created_at = user.created_at || '';
    this.updated_at = user.updated_at || '';
  }
}
