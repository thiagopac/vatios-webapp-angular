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
