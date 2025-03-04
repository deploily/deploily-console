export interface SupportTicketResponse {
  count: number;
  description_columns: any;
  ids: number[];
  label_columns: any;
  list_columns: string[];
  list_title: string;
  order_columns: string[];
  result: SupportTicket[];
}

export interface SupportTicket {
    id: number;
    key: number;
    cart_line_id: number;
    cart_line: any;
    title: string;
    description: string;
    status: string;
    image: string;
    support_ticket_responses: any[];
  }