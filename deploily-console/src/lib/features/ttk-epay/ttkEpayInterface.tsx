import { AppVersionInterface } from "../application/applicationServiceInterface";
import { PaymentProfileInterface } from "../payment-profiles/paymentProfilesInterface";
import { ResourceServicePlan } from "../resourceServicePlans/resourceServicesPlansInterface";
import { ServicePlan } from "../service-plans/servicePlanInterface";


export interface TtkEpayByIdState {
  ttkEpayById?: TtkEpayInterface;
  isLoading: boolean;
  loadingError?: any;
}
export interface UpdateTtkEpayState {
  updateTtkEpay?: any;
  isLoadingUpdate: boolean;
  loadingError?: any;
}
export interface UpgradeTtkEpayState {
  upgradeTtkEpay?: any;
  isLoadingUpgrade: boolean;
  loadingError?: any;
}
export interface TtkEpayResponse {
  count: number;
  description_columns: any;
  ids: number[];
  label_columns: any;
  list_columns: string[];
  list_title: string;
  order_columns: string[];
  result: TtkEpayInterface[];
}

export interface TtkEpayInterface {
  id: number;
  name: string;
  access_url: string;
  api_key: string;
  duration_month: number;
  is_expired: boolean;
  price: number;
  service_plan: Service_plan;
  service_plan_id: string;
  start_date: Date,
  status: string;
  total_amount: number;
  service_details: ServiceDetails;
  application_status: string;
  required_restart: boolean;
  deployment_error: string;
  ttk_epay_api_secret_key: string;
  ttk_epay_client_site_address: string;
  ttk_epay_client_site_email: string;
  ttk_epay_client_site_logo_url: string;
  ttk_epay_client_site_name: string;
  ttk_epay_client_site_phone_number: string;
  ttk_epay_client_site_privacy: string;
  ttk_epay_client_site_terms: string;
  ttk_epay_client_site_url: string;
  ttk_epay_mvc_satim_confirm_url: string;
  ttk_epay_mvc_satim_fail_url: string;
  ttk_epay_mvc_satim_server_url: string;
  ttk_epay_satim_base_url: string;
  ttk_epay_satim_client_server_url: string;
  ttk_epay_satim_confirm_url: string;
  ttk_epay_satim_currency: string;
  ttk_epay_satim_description: string;
  ttk_epay_satim_fail_url: string;
  ttk_epay_satim_json_params: string;
  ttk_epay_satim_language: string;
  ttk_epay_satim_password: string;
  ttk_epay_satim_server_url: string;
  ttk_epay_satim_terminal_id: string;
  ttk_epay_satim_user_name: string;

}

interface Service_plan {
  id: number;
  is_custom: boolean;
  price: number;
  service_plan_type: string;
  subscription_category: string;

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
  type: string;
  unit_price: number;
  is_illigible: boolean;
  minimal_cpu: number;
  minimal_disk: number;
  minimal_ram: number;
  is_subscribed: boolean;
}


export interface UpgradeTtkEpaySubscriptionState {

  duration: number;
  price: number;
  totalAmount: number,
  selectedProfile?: PaymentProfileInterface,
  isBalanceSufficient: boolean | null,
  resource_service_plan?: ResourceServicePlan,
  app_service_plan?: ServicePlan,
  selected_version?: AppVersionInterface,
  promoCode: string,
  promoCodeRate?: number,
  promoColor?: string,
  oldAppServicePrice?: number;
  oldAppServiceStartDate?: Date;
  oldAppServiceDuration?: number;
}



