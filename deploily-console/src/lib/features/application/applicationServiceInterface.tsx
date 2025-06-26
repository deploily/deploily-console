import { ServiceMediaInterface } from "../commons_interfaces";
import { PaymentProfileInterface } from "../payment-profiles/paymentProfilesInterface";
import { ServicePlan } from "../service-plans/servicePlanInterface";

export interface ApplicationServiceResponse {
    count: number;
    description_columns: any;
    ids: number[];
    label_columns: any;
    list_columns: string[];
    list_title: string;
    order_columns: string[];
    result: ApplicationServiceInterface[];
}
export interface ApplicationServiceInterface {//TODO RECHECK THIS INTERFACE TO CONFORM TO THE API RESPONSE
    id: number;
    name: string;
    service_slug?: string;
    price: string;
    description: string;
    average_rating: number;
    documentation_url: string;
    image_service?: string;
    is_in_favorite: boolean;
    medias: ServiceMediaInterface[];
    monitoring: string;
    recommended_apps: {
        id: number;
    };
    service_details: string;//TODO RECHECK THIS FIELD 
    short_description: string;
    specifications: string;
    ssh_access: string;
    type: string;
    unit_price: number;
    min_apps_price: number;
    app_versions: AppVersionInterface[];
}

export interface NewApplicationSubscriptionState {//TODO RECHECK THIS INTERFACE TO CONFORM TO THE API RESPONSE
    duration: number;
    price: number;
    totalAmount: number,
    selectedProfile?: PaymentProfileInterface,
    isBalanceSufficient: boolean | null,
    resource_service_plan?: ServicePlan,
    app_service_plan?: ServicePlan,
    selected_version?: AppVersionInterface, 
}

export interface ApplicationServicesState {
    applicationServicesList?: ApplicationServiceResponse;
    isLoading: boolean;
    loadingError?: any;
}
export interface ApplicationServiceByIdState {
    applicationServiceById?: ApplicationServiceInterface;
    isLoading: boolean;
    loadingError?: any;
}

export interface NewApplicationSubscriptionResponse {
    newSubscriptionIsLoading: boolean,
    newSubscriptionFailed: boolean,
    newSubscriptionResponse?: ApplicationSubscriptionResponse
}


export interface ApplicationSubscriptionResponse {
    form_url: string;
    order_id: string;
    subscription: ApplicationSubscriptionInterface
}

export interface ApplicationSubscriptionInterface {
    recommendation_app_service_id?: number,
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
export interface AppVersionInterface {

    id: number;
    description: string;
    name: string;

}