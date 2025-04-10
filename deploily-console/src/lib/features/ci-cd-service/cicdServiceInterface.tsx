export interface CiCdServiceResponse {
    count: number;
    description_columns: any;
    ids: number[];
    label_columns: any;
    list_columns: string[];
    list_title: string;
    order_columns: string[];
    result: CiCdServiceInterface[];
}
export interface CiCdServiceInterface {
    id: number;
    name: string;
    price: string;
    description: string;
}