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
}