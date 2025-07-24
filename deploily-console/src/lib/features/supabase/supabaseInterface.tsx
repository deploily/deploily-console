
export interface SupabaseAppByIdState {
 supabaseAppById?: SupabaseAppInterface;
  isLoading: boolean;
  loadingError?: any;
}

export interface SupabaseAppResponse {
  count: number;
  description_columns: any;
  ids: number[];
  label_columns: any;
  list_columns: string[];
  list_title: string;
  order_columns: string[];
  result: SupabaseAppInterface[];
}


export interface Version {
  id: number;
  name: string;
  description: string;
}

export interface ServicePlan {
  id: number;
  is_custom: boolean;
  is_published: boolean;
  preparation_time: number;
  price: number;
  service_plan_type: string;
  subscription_category: string;
}

export interface SupabaseAppInterface {
  id: number;
  name: string;
  access_url: string;
  api_key: string;
  application_status: string;
  console_url: string;
  demo_url: string;
  deployment_error: string;
  duration_month: number;
  is_expired: string; // optionally: boolean or enum
  price: number;
  required_restart: boolean;
  ressource_service_plan: ServicePlan;
  service_plan: ServicePlan;
  service_plan_id: number;
  service_details: ServiceDetails;
  start_date: Date
  status: string;
  total_amount: number;
  version: Version;
}
interface ServiceDetails {
  id: number;
  description: string;
  documentation_url: string;
  image_service: string;
  name: string;
  service_slug: string;
  short_description: string;
  specifications: string;
  type: string;
  unit_price: number;
  is_illigible: boolean;
  is_published: boolean,
  is_subscribed: boolean;
  minimal_cpu: number;
  minimal_disk: number;
  minimal_ram: number;
}
