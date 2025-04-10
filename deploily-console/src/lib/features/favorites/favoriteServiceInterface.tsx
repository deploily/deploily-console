import { ApiServiceInterface } from "../api-service/apiServiceInterface";

export interface FavoriteServicesResponse {
  count: number;
  description_columns: any;
  ids: number[];
  label_columns: any;
  list_columns: string[];
  list_title: string;
  order_columns: string[];
  result: FavoriteServiceInterface[];
}
export interface FavoriteServiceInterface {
  id: number;
  service: ApiServiceInterface;
}



