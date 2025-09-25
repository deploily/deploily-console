import { ServicePlan } from "../service-plans/servicePlanInterface";

export interface DeploymentServiceResponse {
  count: number;
  description_columns: any;
  ids: number[];
  label_columns: any;
  list_columns: string[];
  list_title: string;
  order_columns: string[];
  result: DeploymentsServiceInterface[];
}
export interface DeploymentsServiceInterface {
  id: number;
  name: string;
  price: string;
  image_service: string;
  price_category: string;
  service_unity: string;
  description: string;
  is_subscribed: boolean;
  short_description: string;
  unit_price: number;
  documentation_url: string;
  created_at: string;
  updated_at: string;
  deployment_versions: AppVersionInterface[];
  specifications: string;
  service_slug?: string;
}
export interface NewDeploymentSubscriptionState {
  duration: number;
  price: number;
  managed_ressource_details?: any;
  deployment_service_plan?: ServicePlan;
  totalAmount: number;
  selectedProfile?: any;
  isBalanceSufficient: boolean | null;
  selected_version?: AppVersionInterface;
  promoCode: string;
  promoCodeRate?: number;
  promoColor?: string;
}
export interface DeploymentServiceResponseState {
  deploymentServicesList?: DeploymentServiceResponse;
  isLoading: boolean;
  loadingError?: any;
}
export interface DeploymentServiceBySlugState {
  deploymentServiceBySlug?: DeploymentsServiceInterface;
  isLoading: boolean;
  loadingError?: any;
}

export interface AppVersionInterface {
  id: number;
  description: string;
  name: string;
}

export interface NewDeploymentSubscriptionResponse {
  newSubscriptionIsLoading: boolean;
  newSubscriptionFailed: boolean;
  newSubscriptionResponse?: DeploymentSubscriptionResponse;
}

export interface DeploymentSubscriptionResponse {
  form_url: string;
  order_id: string;
  subscription: DeploymentSubscriptionInterface
}

export interface DeploymentSubscriptionInterface {
  recommendation_deployment_service_id?: number,
  ressource_service_plan_selected_id?: number,
  id: number;
  duration_month: number;
  name: string;
  price: number
  promo_code_id: number;
  service_plan_id: number;
  start_date: Date;
  status: string;

}