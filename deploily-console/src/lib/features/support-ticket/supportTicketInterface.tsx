import { SubscriptionInterface } from "../subscriptions/subscriptionInterface";
import { SupportTicketChatResponseInterface } from "../support-ticket -responses/supportTicketResponsesInterface";

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
  subscribe_id: number;
  subscription?: SubscriptionInterface;
  title: string;
  description: string;
  status: string;
  image: string;
  support_ticket_responses: SupportTicketChatResponseInterface[];
}