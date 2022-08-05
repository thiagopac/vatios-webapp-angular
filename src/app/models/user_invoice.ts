import { IConsumerUnit } from 'src/app/models/consumer_unit';

export type UserInvoiceType = IUserInvoice | undefined;

export interface IUserInvoice {
  uuid: string;
  due_date: Date;
  value: number;
  consumption: number;
  payment: IPaymentStatusEnum;
  file: string;
  created_at: Date;
  updated_at: Date;
  consumer_unit: IConsumerUnit;
}

export enum IPaymentStatusEnum {
  paymentPending = 'payment-pending',
  paymentProcessing = 'payment-processing',
  paymentDone = 'payment-done',
}

export interface IUserInvoiceCompensationDetails {
  invoice_value: number;
  current_balance_crypto: number;
  consumption: number;
  balance_crypto_used: number;
  complementary_crypto_used: number;
  complementary_crypto_cost: number;
  non_compensating_charges: number;
  total_to_pay: number;
  kwh_value: number;
  average_crypto_cost: number;
  invoice_total_savings: number;
}
