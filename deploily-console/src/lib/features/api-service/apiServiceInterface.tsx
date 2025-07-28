export interface ApiServiceResponse {
  count: number;
  description_columns: any;
  ids: number[];
  label_columns: any;
  list_columns: string[];
  list_title: string;
  order_columns: string[];
  result: ApiServiceInterface[];
}
export interface ApiServiceInterface {
  id: number;
  name: string;
  description: string;
  documentation_url: string;
  unit_price: number;
  price_category: string;
  service_unity	: string;
  service_url: string;
  image_service: string;
  short_description: string;
  specifications: string;
  curl_command: string;
  is_in_favorite?: boolean;
  is_subscribed?: boolean;
  api_playground_url?: string;
}
