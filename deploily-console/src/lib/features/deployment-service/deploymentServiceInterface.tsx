export interface DeploymentServiceResponse {
    count: number;
    description_columns: any;
    ids: number[];
    label_columns: any;
    list_columns: string[];
    list_title: string;
    order_columns: string[];
    result: DeploymentsServiceInterface[];
}
export interface DeploymentsServiceInterface {
    id: number;
    name: string;
    price: string;
    image: string;
    price_category: string;
    service_unity: string;
    description: string;
}
export interface DeploymentServiceResponseState {
    deploymentServicesList?: DeploymentServiceResponse;
    isLoading: boolean;
    loadingError?: any;
}
export interface DeploymentServiceByIdState {
    deploymentServiceById?: DeploymentsServiceInterface;
    isLoading: boolean;
    loadingError?: any;
}