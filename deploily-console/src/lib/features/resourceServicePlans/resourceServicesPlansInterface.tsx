import { Provider } from "../cloud-resource/cloudResourceInterface";

export interface ProvidersResponse {
    count: number;
    description_columns: any;
    ids: number[];
    label_columns: any;
    list_columns: string[];
    list_title: string;
    order_columns: string[];
    result: Provider[];
}