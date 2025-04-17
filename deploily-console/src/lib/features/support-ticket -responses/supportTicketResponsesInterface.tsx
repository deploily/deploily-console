
export interface SupportTicketResponsesListInterface {
  count: number;
  description_columns: any;
  ids: number[];
  label_columns: any;
  list_columns: string[];
  list_title: string;
  order_columns: string[];
  result: SupportTicketChatResponseInterface[];
}

export interface SupportTicketChatResponseInterface {
  id: number;
  message: string;
  changed_on: string;
  created_on: string;
  created_by?: any;
}