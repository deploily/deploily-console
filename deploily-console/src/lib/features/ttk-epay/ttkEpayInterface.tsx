

export interface ttkEpayByIdState {
  ttkEpayById?: ttkEpayInterface;
  isLoading: boolean;
  loadingError?: any;
}
export interface ttkEpayResponse {
  count: number;
  description_columns: any;
  ids: number[];
  label_columns: any;
  list_columns: string[];
  list_title: string;
  order_columns: string[];
  result: ttkEpayInterface[];
}

export interface ttkEpayInterface {
  id: number;
  name: string;
  api_key: string;
  api_secret_key: string;
  application_status: string;
  client_site_address: string;
  client_site_email: string;
  client_site_logo_url: string;
  client_site_name: string;
  client_site_phone_number: string;
  client_site_privacy: string;
  client_site_terms: string;
  client_site_url: string;
  duration_month: number;
  is_expired: boolean;
  mvc_satim_fail_url: string;
  mvc_satim_server_url: string;
  price: number;
  satim_base_url: string;
  satim_client_server_url: string;
  satim_confirm_url: string;
  satim_currency: string;
  satim_description: string;
  satim_fail_url: string;
  satim_json_params: string;
  satim_language: string;
  satim_password: string;
  satim_server_url: string;
  satim_terminal_id: string;
  satim_user_name: string;
  service_details: ServiceDetails;
  service_plan: Service_plan;
  start_date: Date,
  status: string;
  total_amount: number;
  url_segment: string;

}

interface Service_plan {
  id: number;
  is_custom: boolean;
  price: number;
  service_plan_type: string;
  subscription_category: string;

}
interface ServiceDetails {
  id: number;
  description: string;
  documentation_url: string;
  image_service: string;
  monitoring: string;
  name: string;
  service_slug: string;
  short_description: string;
  specifications: string;
  ssh_access: string;
  type: string;
  unit_price: number;
  is_illigible: boolean;
}









