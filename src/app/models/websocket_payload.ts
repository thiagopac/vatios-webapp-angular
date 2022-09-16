import { AuthModel } from 'src/app/models/auth';
import { AdminType } from 'src/app/modules/admin-auth';

export interface IWebsocketPayload {
  headers?: AuthModel;
  admin?: AdminType;
  data: any;
}
