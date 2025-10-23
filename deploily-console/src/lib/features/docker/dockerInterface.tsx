
export interface DockerByIdState {
    dockerById?: dockerDepInterface;
    isLoading: boolean;
    loadingError?: any;
}
export interface DockerDeptResponse {
    result: dockerDepInterface[];
}
export interface dockerDepInterface {
    access_url: string;
    api_key: string;
    argocd_url: string;
    argocd_user_name: string;
    argocd_password: string;
    backend_url: string;
    frontend_url: string;
    custom_paramters: CustomParameter[];
    deployment_error: string;
    duration_month: number;
    id: number;
    is_expired: boolean;
    managed_ressource: ManagedResource;
    managed_ressource_details: Record<string, any>; // empty object possible
    managed_ressource_id: number;
    name: string;
    phone: string | null;
    price: number;
    required_restart: boolean;
    service_details: ServiceDetails;
    service_plan: ServicePlan;
    service_plan_id: number;
    start_date: string;
    status: string;
    total_amount: number;
    get_plan_details: GetPlanDetails
}

export interface GetPlanDetails {
    options: PlanOption[];
    plan: PlanInfo;
    price: number;
    service_plan_id: number;
    service_plan_type: string;
    subscription_category: string;
}

export interface PlanOption {
    html_content: string;
    icon: string;
    id: number;
    sequence: number | null;
    type: string;
    value: number;
}

export interface PlanInfo {
    id: number;
    name: string;
}

export interface CustomParameter {
    description: string;
    id: number;
    name: string;
    value: string;
}

export interface ManagedResource {
    host_name: string;
    id: number;
    ip: string;
    operator_system: string;
}

export interface ServiceDetails {
    deployment_field: string;
    description: string;
    documentation_url: string;
    id: number;
    image_service: string;
    is_eligible: boolean;
    is_published: boolean;
    is_subscribed: boolean;
    name: string;
    price_category: string;
    sequence: number;
    service_slug: string;
    service_unity: string;
    short_description: string;
    specifications: string;
    type: string;
    unit_price: number;
}

export interface ServicePlan {
    display_on_app: boolean;
    id: number;
    is_custom: boolean;
    is_published: boolean;
    preparation_time: number;
    price: number;
    priority: number;
    service_plan_type: string;
    subscription_category: string;
    unity: string;
}
