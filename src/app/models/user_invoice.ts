import { IConsumerUnit } from "src/app/models/consumer_unit";

export interface IUserInvoice {
    uuid: string;
    due_date: Date;
    value: number;
    consumption: number;
    payment: string;
    file: string;
    created_at: Date;
    updated_at: Date;
    consumer_unit: IConsumerUnit
  }