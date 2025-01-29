export interface ApiServiceResponse {
  count: number;
  description_columns: any;
  ids: number[];
  label_columns: any;
  list_columns: string[];
  list_title: string;
  order_columns: string[];
  result: ApiServiceInterface[];
}
export interface ApiServiceInterface {
  id: number;
  name: string;
  price: string;
  description: string;
}
