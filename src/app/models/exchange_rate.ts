export interface IExchangeRate {
  uuid: string;
  source: string;
  target: string;
  rate: number;
  created_at: Date;
  updated_at: Date;
}
