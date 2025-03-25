
export interface ProfileServicesResponse {
  count: number;
  description_columns: any;
  ids: number[];
  label_columns: any;
  list_columns: string[];
  list_title: string;
  order_columns: string[];
  result: ProfileServiceInterface[];
}

export interface ProfileByIdResponse {
  count: number;
  description_columns: any;
  id: number;
  label_columns: any;
  list_columns: string[];
  list_title: string;
  order_columns: string[];
  result: ProfileServiceInterface;
}
export interface ProfileServiceInterface {
  id: number;
  name: string;
  balance: number;
  phone: string;
  company_name: string;
  company_registration_number: string;
  user_id: number;
  user: User;
}

export interface User {
  id: number;
  active: boolean;
  changed_on: Date;
  created_on: Date;
  email: string;
  fail_login_count: number;
  first_name: string;
  last_login: string;
  last_name: string;
  login_count: number;
  password: string;
  username: string;


}



