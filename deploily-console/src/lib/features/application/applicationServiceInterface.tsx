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
export interface ApplicationServiceInterface {
    id: number;
    name: string;
    price: string;
    description: string;
}