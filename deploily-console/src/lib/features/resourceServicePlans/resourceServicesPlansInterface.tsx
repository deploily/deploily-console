export interface ResourceServicesPlansResponse {
  result: ResourceServicePlan[];
}

export interface ResourceServicePlan {
  "id": number,
  "options": PlanOption[];
  "plan_name": string,
  "preparation_time": number,
  "price": number,
  "provider_info"?: {
          "logo": string,
          "name": string,
          "website": string
  },
  "service_name": string,
  "service_plan_type": string,
  "service_id": number,
}

export interface PlanOption {
  "html_content": string,
  "icon": string,
  "id": number,
  "option_type": string,
  "option_value": number,
  "sequence": number
}