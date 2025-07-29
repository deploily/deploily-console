
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

export interface SubscriptionInterface {
  id: number;
  duration_month: number;
  name: string;
  price: number;
  price_category: string;
  unity: string;
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
  unity: string;

}

export interface SubscriptionHistory {
  api_key: string;
  duration_month: number;
  id: number;
  is_encrypted: boolean;
  is_expired: boolean;
  is_renew: boolean;
  is_upgrade: boolean;
  name: string;
  payment_status: string;
  price: number;
  profile_id: number;
  profile_name: string;
  promo_code_id: number ;
  promo_code_name: string;
  service_plan_id: number;
  start_date: string;
  status: string;
  total_amount: number;
  service_details: ServiceDetails;
  service_plan: ServicePlan;
}

export interface SubscriptionsState {
  subscriptionResponse?: SubscriptionsResponse;
  subscriptionLoadingError?: any;
  subscriptionLoading: boolean;
}

export interface SubscriptionsHistoryState {
  subscriptionHistoryList?: SubscriptionHistory[];
  subscriptionHistoryLoadingError?: any;
  subscriptionHistoryLoading: boolean;
}
