import { IPaymentMethodEnum } from "src/app/models/pay_bill.helper";
import { IUserInvoice } from "src/app/models/user_invoice";

export type InvoicePaymentType = IInvoicePayment | undefined;

export interface IInvoicePayment {
  uuid: string;
  invoice: IUserInvoice ;
  balance_crypto_used: number;
  complementary_crypto_used: number;
  total_payable: number;
  method: IPaymentMethodEnum
  status: IInvoicePaymentStatusEnum;
  created_at: Date;
  updated_at: Date;
}

export enum IInvoicePaymentStatusEnum {
  paymenyPending = 'payment-pending',
  paymenyCanceled = 'payment-canceled',
  paymenyReceived = 'payment-received',
}
