
export interface PaymentProfilesResponse {
  count: number;
  description_columns: any;
  ids: number[];
  label_columns: any;
  list_columns: string[];
  list_title: string;
  order_columns: string[];
  result: PaymentProfileInterface[];
}

export interface ProfileByIdResponse {
  count: number;
  description_columns: any;
  id: number;
  label_columns: any;
  list_columns: string[];
  list_title: string;
  order_columns: string[];
  result: PaymentProfileInterface;
}
export interface PaymentProfileInterface {
  id: number;
  name: string;
  last_name: string;
  balance: number;
  phone: string;
  company_name: string;
  company_registration_number: string;
  user_id: number;
  user: User;
  address: string;
  city: string;
  postal_code: string;
  country: string;
  wilaya: string;
  tax_article: string;
  nif: string;
  nis: string;
  is_company: boolean;
  is_default_profile: boolean;

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

export interface newPaymentProfileResponse {
  id: number;
  name: string;
  last_name: string;
  balance: number;
  phone: string;
  company_name: string;
  company_registration_number: string;
  user_id: number;
  user: User;
  address: string;
  city: string;
  postal_code: string;
  country: string;
  wilaya: string;
  tax_article: string;
  nif: string;
  nis: string;
  is_company: boolean;
  is_default_profile: boolean;
}
