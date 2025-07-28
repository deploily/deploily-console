
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
  price_period: string;
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
  promo_code_id: number | null;
  promo_code_name: string | null;
  service_plan_id: number;
  start_date: string;
  status: string;
  total_amount: number;
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
[{
  "api_key": "",
  "duration_month": 1,
  "id": 308,
  "is_encrypted": false,
  "is_expired": true,
  "is_renew": true,
  "is_upgrade": true,
  "name": "Level 1 BASIC",
  "payment_status": "paid",
  "price": 900,
  "profile_id": 58,
  "profile_name": "bouchra",
  "promo_code_id": null,
  "promo_code_name": null,
  "service_plan_id": 14,
  "start_date": "2025-05-23T14:29:33.364244",
  "status": "active",
  "total_amount": 1000
},]