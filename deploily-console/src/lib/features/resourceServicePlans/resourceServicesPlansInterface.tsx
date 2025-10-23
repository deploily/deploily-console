export interface ResourceServicesPlansResponse {
  result: ManagedRessourceDetails[];
}

export interface ManagedRessourceDetails {
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
  "managed_ressource_id"?:number,
  "time_remaining"?:number,
  isManaged?: boolean;        // existing managed resource selected from list
  isAlreadyPaid?: boolean;
}

export interface PlanOption {
  "html_content": string,
  "icon": string,
  "id": number,
  "option_type": string,
  "option_value": number,
  "sequence": number
}
export interface ManagedRessource {
  host_name: string | null;
  id: number;
  ip: string;
  operator_system: string;
}