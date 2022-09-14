import { IConsumerUnit } from 'src/app/models/consumer_unit';
import { IUserInvoice } from 'src/app/models/user_invoice';

interface IPayBill {
  consumerUnit?: IConsumerUnit;
  userInvoice?: IUserInvoice;
  balanceCryptoUsed?: number;
  complementaryCryptoUsed?: number;
  paymentMethod?: IPaymentMethodEnum;
  totalPayable?: number;
}

export enum IPaymentMethodEnum {
  pix = 'pix',
  bankSlip = 'bank-slip',
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
