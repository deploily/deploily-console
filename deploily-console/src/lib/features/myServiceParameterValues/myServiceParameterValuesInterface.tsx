
export interface ServiceParametersValuesResponse {
  count: number;
  description_columns: any;
  ids: number[];
  label_columns: any;
  list_columns: string[];
  list_title: string;
  order_columns: string[];
  result: ServiceParameterValueInterface[];
}
export interface ServiceParameterValueInterface {
  id: number,
  name: string,
  service_id: number,
  type: string,
  cart_line_id: number,
  parameter: ParameterInterface,
  parameter_id: number,
  value: string
}

export interface ParameterInterface {
    id: number;
    name: string;
    type: string;
}




