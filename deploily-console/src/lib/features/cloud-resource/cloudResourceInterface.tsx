
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
    mail_sales: string;
    mail_support: string;
    phone_partnership: string;
    phone_sales: string;
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
    affiliation_state: string;
    provider_name: string;
    service_name: string;
    total_price: number;
    created_on: string;
}
