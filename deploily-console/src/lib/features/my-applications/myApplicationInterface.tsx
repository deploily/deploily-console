import { AppVersionInterface } from "../application/applicationServiceInterface";
import { PaymentProfileInterface } from "../payment-profiles/paymentProfilesInterface";
import { ManagedRessourceDetails } from "../resourceServicePlans/resourceServicesPlansInterface";
import { ServicePlan } from "../service-plans/servicePlanInterface";

export interface MyApplicationState {
  MyApplicationList?: myApplicationInterface[];
  isLoading: boolean;
  loadingError?: any;
}
export interface MyApplicationByIdState {
  myApplicationsById?: myApplicationInterface;
  isLoading: boolean;
  loadingError?: any;
}
export interface myApplicationResponse {
  result: myApplicationInterface[];
}

export interface myApplicationInterface {
  id: number;
  name: string;
  api_key: string;
  application_status: string;
  price: number;
  price_category: string;
  unity: string;
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
  managed_ressource_details:ManagedRessourceDetails;
}

interface Service_plan {
  id: number;
  is_custom: boolean;
  price: number;
  subscription_category: string;
  unity: string;

}
interface ServiceDetails {
  id: number;
  description: string;
  documentation_url: string;
  image_service: string;
  monitoring: string;
  name: string;
  service_slug: string;
  short_description: string;
  specifications: string;
  ssh_access: string;
  type: string;
  unit_price: number;

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
export interface UpgradeMyApplicationState {
  upgradeMyApplication?: any;
  isLoadingUpgrade: boolean;
  loadingError?: any;
}
export interface RenewMyApplicationState {
  renewMyApplication?: any;
  isLoadingRenew: boolean;
  loadingError?: any;
}

export interface UpgradeMyApplicationInterface {
  duration: number;
  price: number;
  totalamount: number,
  selectedProfile?: PaymentProfileInterface,
  isBalanceSufficient: boolean | null,
  managed_ressource_details?: ManagedRessourceDetails,
  app_service_plan?: ServicePlan,
  selected_version?: AppVersionInterface,
  promoCode: string,
  promoCodeRate?: number,
  promoColor?: string,
  oldAppServicePrice?: number;
  oldAppServiceStartDate?: Date;
  oldAppServiceDuration?: number;
}

