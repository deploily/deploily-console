
export interface ApiServiceSubscriptionsResponse {
  count: number;
  description_columns: any;
  ids: number[];
  label_columns: any;
  list_columns: string[];
  list_title: string;
  order_columns: string[];
  result: ApiServiceSubscriptionInterface[];
}

export interface NewApiServiceSubscriptionResponse {
  form_url: string;
  order_id: string;
  subscription: ApiServiceSubscriptionInterface;
}

export interface ApiServiceSubscriptionInterface {
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
  price_category: string;
  unity: string;
  service_url: string;
  image_service: string;
  short_description: string;
  specifications: string;
  curl_command: string;
  api_key: string;
  is_subscribed: boolean;
}
export interface ServicePlan {
  id: number;
  price: number;
  subscription_category: string;
  unity: string;
}


export interface NewUpgradeApiSubscription {
  newUpgradeApiSubscriptionIsLoading: boolean,
  newpgradeApiSubscriptionFailed: boolean,
  upgradeApiSubscriptionCreatedSuccess?: ApiServiceSubscriptionsResponse
}
export interface RenewApiSubscription {
  renewApiSubscriptionIsLoading: boolean,
  renewApiSubscriptionFailed: boolean,
  renewApiSubscriptionCreatedSuccess?: ApiServiceSubscriptionsResponse
}
