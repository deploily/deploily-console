
export interface ProfileServicesResponse {
  count: number;
  description_columns: any;
  ids: number[];
  label_columns: any;
  list_columns: string[];
  list_title: string;
  order_columns: string[];
  result:ProfileServiceInterface[];
}
export interface ProfileServiceInterface {
  id: number;
  name: string;
  balance: number;
}



