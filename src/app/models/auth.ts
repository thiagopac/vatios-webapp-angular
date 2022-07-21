export interface IAuth {
  token: string;
  type: string;
  expires_at: Date;
}

export class AuthModel implements IAuth {
  token: string;
  type: string;
  expires_at: Date;
}

export class AuthRegisterModel {
  email: string;
  password: string;
  first_name: string;
  last_name: string;

  setAuthRegister(_data: unknown) {
    const reg = _data as AuthRegisterModel;
    this.email = reg.email || '';
    this.password = reg.password || '';
    this.first_name = reg.first_name || '';
    this.last_name = reg.last_name || '';
  }
}
