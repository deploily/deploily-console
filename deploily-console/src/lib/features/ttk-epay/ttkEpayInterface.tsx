

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
  application_status: string;
  price: number;
  duration_month: number;
  is_expired: boolean;
  service_plan_id: number;
  start_date: Date;
  total_amount: number;
  service_details: ServiceDetails;
  service_plan: Service_plan;
  is_in_favorite: string;
  image_service: string;
  short_description: string;
  status: string;
  url_segment	:string;

}

interface Service_plan {
  id: number;
  is_custom: boolean;
  price: number;
  subscription_category: string;

}
 interface ServiceDetails {
    id: number;
    description: string;
    documentation_url:string;
    image_service: string;
    monitoring: string;
    name: string;
    service_slug: string;
    short_description: string;
    specifications: string;
    ssh_access:string;
    type: string;
    unit_price:  number;
  
 }






