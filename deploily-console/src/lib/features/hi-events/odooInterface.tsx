import { ManagedRessource, ManagedRessourceDetails } from "../resourceServicePlans/resourceServicesPlansInterface";

export interface OdooAppByIdState {
  odooAppById?: OdooAppInterface;
  isLoading: boolean;
  loadingError?: any;
}

export interface OdooAppResponse {
  count: number;
  description_columns: any;
  ids: number[];
  label_columns: any;
  list_columns: string[];
  list_title: string;
  order_columns: string[];
  result: OdooAppInterface[];
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

export interface OdooAppInterface {
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
  odoo_password: string;
  price: number;
  required_restart: boolean;
  managed_ressource_details: ManagedRessourceDetails;
  managed_ressource_id: number;
  managed_ressource: ManagedRessource;
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

