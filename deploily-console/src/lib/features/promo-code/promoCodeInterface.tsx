export interface PromoCodeResponse {
  count: number;
  description_columns: any;
  ids: number[];
  label_columns: any;
  list_columns: string[];
  list_title: string;
  order_columns: string[];
  result: PromoCodeInterface[];
}
export interface PromoCodeInterface {
  message: string;
  rate: number;
}

