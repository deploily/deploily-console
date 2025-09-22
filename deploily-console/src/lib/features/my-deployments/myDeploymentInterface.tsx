
export interface MyDeploymentState {
  MyDeploymentList?: myDeploymentInterface[];
  isLoading: boolean;
  loadingError?: any;
}
export interface MyDeploymentByIdState {
  myDeploymentsById?: myDeploymentInterface;
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

//export interface myDeploymentInterface {
//   id: number;
//   name: string;
//   api_key: string;
//   deployment_status: string;
//   price: number;
//   price_category: string;
//   unity: string;
//   duration_month: number;
//   is_expired: boolean;
//   service_plan_id: number;
//   start_date: Date;
//   total_amount: number;
//   service_details: ServiceDetails;
//   service_plan: Service_plan;
//   is_in_favorite: string;
//   image_service: string;
//   short_description: string;
//   status: string;
// }

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
