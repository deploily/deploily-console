import { ApiServiceInterface } from "../apiService/apiServiceInterface";

export interface CartLineResponse {
    count: number;
    description_columns: any;
    ids: number[];
    label_columns: any;
    list_columns: string[];
    list_title: string;
    order_columns: string[];
    result: CartLinesInterface[];
}
export interface CartLinesInterface {
    id: number;
    cart_id: number;
    service_id: number;
    amount: string;
    duration_month: number;
    start_date: Date;
}
export interface CartLineByIdInterface {
    id: number;
    cart: CartLinesInterface[];
    service: ApiServiceInterface[];
    amount: string;
    duration_month: number;
    parameters_values: string;
    start_date: Date;
}
