import { ServicePlan } from "../service-plans/servicePlanInterface";

export interface CloudResourceResponse {
    count: number;
    description_columns: any;
    ids: number[];
    label_columns: any;
    list_columns: string[];
    list_title: string;
    order_columns: string[];
    result: CloudResourceInterface[];
}
export interface CloudResourceInterface {
    id: number;
    name: string;
    price: string;
    description: string;
    logo: string;
}
export interface ResourceInterface {
    id: number;
    name: string;
    description: string;
    documentation_url: string;
    unit_price: number;
    service_url: string;
    image_service: string;
    short_description: string;
    specifications: string;
    curl_command: string;
    is_in_favorite?: boolean;
    provider?: Provider;
    discount: number;
}

export interface Provider {
    id: number;
    name: string;
    logo: string;
    contact_number: string;
    extra_info: string;
    facebook_page: string;
    instagram_page: string;
    linkedin_page: string;
    mail_partnership: string;
    mail_sailes: string;
    mail_support: string;
    phone_partnership: string;
    phone_sailes: string;
    phone_support: string;
    short_description: string;
    website: string;
}


export interface MyResourcesResponses {
    count: number;
    description_columns: any;
    ids: number[];
    label_columns: any;
    list_columns: string[];
    list_title: string;
    order_columns: string[];
    result: MyResourcesList[];
}

export interface MyResourcesList {
    id: number;
    Affiliation_state: string;
    provider: Provider;
    total_price: number;
    service_plan: ServicePlan;
    created_on: string;
}