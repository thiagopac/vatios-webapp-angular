import { IConsumerUnit } from 'src/app/models/consumer_unit';
import { IUserInvoice } from 'src/app/models/user_invoice';

interface IPayBill {
  consumerUnit?: IConsumerUnit;
  userInvoice?: IUserInvoice;
  balanceCryptoUsed?: number;
  complementaryCryptoUsed?: number;
  paymentMethod?: 'pix' | 'bank-slip';
  totalPayable?: number;
}

const inits: IPayBill = {
  consumerUnit: undefined,
  userInvoice: undefined,
  balanceCryptoUsed: undefined,
  complementaryCryptoUsed: undefined,
  paymentMethod: undefined,
  totalPayable: undefined,
};

export { IPayBill, inits };
