
export interface ServiceParametersResponse {
  count: number;
  description_columns: any;
  ids: number[];
  label_columns: any;
  list_columns: string[];
  list_title: string;
  order_columns: string[];
  result: ServiceParameterInterface[];
}
export interface ServiceParameterInterface {
  id: number,
  name: string,
  service_id: number,
  type: string
}



