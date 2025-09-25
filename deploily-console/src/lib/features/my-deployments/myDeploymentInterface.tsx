
export interface MyDeploymentState {
  MyDeploymentList?: myDeploymentInterface[];
  isLoading: boolean;
  loadingError?: any;
}
export interface MyDeploymentResponse {
  result: myDeploymentInterface[];
}
export interface myDeploymentInterface {
  id: number;
  name: string;
  price: number; 
  price_category: string;
  short_description: string;
  image: string;
  status: string;
  deployment_status: string;
  duration_month: number;
  service_details: ServiceDetails;
}


interface Service_plan {
  id: number;
  is_custom: boolean;
  price: number;
  subscription_category: string;
  unity: string;
}
export interface ServiceDetails {
  api_key: string | null;
  api_playground_url: string | null;
  curl_command: string | null;
  description: string;
  documentation_url: string;
  id: number;
  image_service: string;
  is_subscribed: boolean;
  monitoring: string | null;
  name: string;
  price_period: string | null;
  service_slug: string;
  service_url: string | null;
  short_description: string;
  specifications: string;
  ssh_access: string | null;
  type: string;
  unit_price: number;
}
