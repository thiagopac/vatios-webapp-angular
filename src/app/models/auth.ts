export interface IAuth {
  token: string;
  type: string;
  expiresAt: Date;
}

export class AuthModel implements IAuth {
  token: string;
  type: string;
  expiresAt: Date;
}
