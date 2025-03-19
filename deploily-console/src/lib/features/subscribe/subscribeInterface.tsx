
export interface SubscribeResponse {
  count: number;
  description_columns: any;
  ids: number[];
  label_columns: any;
  list_columns: string[];
  list_title: string;
  order_columns: string[];
  result: SubscribeInterface[];
}
export interface SubscribeInterface {
  id: number;
  name: string;
  total_amount: number;
  price: number;
  duration_month: number;
  start_date: Date;
  status: string;
  service_details: ServiceDetails;
  service_plan: ServicePlan;
}

export interface ServiceDetails {
  id: number;
  name: string;
  description: string;
  documentation_url: string;
  unit_price: number;
  service_url: string;
  image_service: string;
  short_description: string;
  specifications: string;
  curl_command: string;
  api_key:string;

}
export interface ServicePlan {
  id: number;
  price:number;
  subscription_category: string;
}


