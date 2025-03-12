import { ApiServiceInterface } from "../apiService/apiServiceInterface";

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
  price:number;
  name:string;
  plan:Plan;
  ubscription_category:"string";
  service_id:number;
  service:ApiServiceInterface
}

export interface Plan {
  id: number;
  name: string;
}