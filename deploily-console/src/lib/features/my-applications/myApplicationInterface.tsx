export interface MyApplicationState {
  MyApplicationList?: myApplicationResponse;
  isLoading: boolean;
  loadingError?: any;
}
export interface myApplicationResponse {
  count: number;
  description_columns: any;
  ids: number[];
  label_columns: any;
  list_columns: string[];
  list_title: string;
  order_columns: string[];
  result: myApplicationInterface[];
}

export interface myApplicationInterface {
  id: number;
  name: string;
  description: string;
  application_status: string;
  price: number;
  duration_month: string;
  is_expired: string;
  service_plan_id: number;
  start_date: Date;
  total_amount: number;
  api_key: string;
  service_details: string;
  service_plan: Service_plan;
  is_in_favorite: string;
  image_service: string;
  short_description: string

}

interface Service_plan {
  id: number;
  is_custom: boolean;
  price: number;
  subscription_category: string;

}


