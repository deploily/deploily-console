import { ApiServiceInterface } from "../api-service/apiServiceInterface";
import { ResourceInterface } from "../cloud-resource/cloudResourceInterface";

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
  ubscription_category: "string";
  service_id: number;
  service: ApiServiceInterface;
  options: ServicePlanOption[];
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
export interface ResourcePlanResponse {
  count: number;
  description_columns: any;
  ids: number[];
  label_columns: any;
  list_columns: string[];
  list_title: string;
  order_columns: string[];
  result: ServicePlan[];
}

export interface ResourcePlan {
  id: number;
  key: number;
  limit: string;
  price: number;
  name: string;
  plan: Plan;
  ubscription_category: "string";
  service_id: number;
  service: ResourceInterface;
  options: ServicePlanOption[];
}