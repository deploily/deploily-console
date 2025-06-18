import { ApiServiceInterface } from "../api-service/apiServiceInterface";

export interface ServicePlanResponse {
  count: number;
  description_columns: any;
  ids: number[];
  label_columns: any;
  list_columns: string[];
  list_title: string;
  order_columns: string[];
  result: ServicePlan[];
}

export interface ServicePlan {
  id: number;
  key: number;
  limit: string;
  price: number;
  name: string;
  plan: Plan;
  service_id: number;
  service: ApiServiceInterface;
  options: ServicePlanOption[];
  is_custom: boolean;
  subscription_category: string;
}

export interface Plan {
  id: number;
  name: string;
}

export interface ServicePlanOption {
  id: number;
  icon: string;
  html_content: string;

}

