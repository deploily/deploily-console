export interface ContactUsResponse {
  count: number;
  description_columns: any;
  ids: number[];
  label_columns: any;
  list_columns: string[];
  list_title: string;
  order_columns: string[];
  result: ContactUsInterface[];
}
export interface ContactUsInterface {
  id: number;
  created_on: Date;
  email: string;
  message: string;
  name: string;
}
