export interface ProfileResponse {
  count: number;
  description_columns: any;
  ids: number[];
  label_columns: any;
  list_columns: string[];
  list_title: string;
  order_columns: string[];
  result: ProfileInterface[];
}
export interface ProfileInterface {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  username: string;
  password: string;
}
