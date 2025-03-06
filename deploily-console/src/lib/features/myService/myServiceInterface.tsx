export interface myServiceResponse {
  count: number;
  description_columns: any;
  ids: number[];
  label_columns: any;
  list_columns: string[];
  list_title: string;
  order_columns: string[];
  result: myServiceInterface[];
}
export interface myServiceInterface {
  id: number;
  name: string;
  amount:string,
  created_on: Date,
  duration_month: number
  start_date: Date, 
  changed_on: Date
}
