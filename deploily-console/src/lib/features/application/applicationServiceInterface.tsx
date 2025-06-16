import { ServiceMediaInterface } from "../commons_interfaces";
import { PaymentProfileInterface } from "../payment-profiles/paymentProfilesInterface";

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
    price: string;
    description: string;
    average_rating: number;
    documentation_url: string;
    image_service: string;
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
}

export interface NewApplicationSubscriptionState {//TODO RECHECK THIS INTERFACE TO CONFORM TO THE API RESPONSE
    duration: number;
    price: number;
    resource_service_plan_id?: number;
    service_plan_selected_id?: number;
    totalAmount: number,
    selectedProfile?: PaymentProfileInterface,
    isBalanceSufficient: boolean | null,
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