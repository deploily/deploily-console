
export interface SubscriptionsResponse {
  count: number;
  description_columns: any;
  ids: number[];
  label_columns: any;
  list_columns: string[];
  list_title: string;
  order_columns: string[];
  result: SubscriptionInterface[];
}

export interface NewSubscriptionResponse {
  form_url: string;
  order_id: string;
  subscription: SubscriptionInterface;
}

export interface SubscriptionInterface {
  id: number;
  duration_month: number;
  name: string;
  price: number
  promo_code_id: number;
  service_plan_id: number;
  start_date: Date;
  status: string;
  total_amount: number;
  service_details: ServiceDetails;
  service_plan: ServicePlan;
  api_key?: string,
}


export interface ServiceDetails {
  id: number;
  name: string;
  description: string;
  documentation_url: string;
  api_playground_url: string;
  unit_price: number;
  service_url: string;
  image_service: string;
  short_description: string;
  specifications: string;
  curl_command: string;
  api_key: string;

}
export interface ServicePlan {
  id: number;
  price: number;
  subscription_category: string;
}


