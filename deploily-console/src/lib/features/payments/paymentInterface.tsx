import { PaymentProfileInterface } from "../payment-profiles/paymentProfilesInterface";
import { SubscriptionInterface } from "../subscriptions/subscriptionInterface";

export interface PaymentResponse {
    count: number;
    description_columns: any;
    ids: number[];
    label_columns: any;
    list_columns: string[];
    list_title: string;
    order_columns: string[];
    result: PaymentInterface[];
}
export interface PaymentInterface {
    id: string;
    profile: PaymentProfileInterface;
    subscription: SubscriptionInterface;
    amount: number;
    status: string;
    payment_method: string;
    start_date: Date;
    payment_receipt?: string;
}
