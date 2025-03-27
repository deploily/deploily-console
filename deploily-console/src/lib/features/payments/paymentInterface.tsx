import { ProfileServiceInterface } from "../profileService/profileServiceInterface";
import { SubscribeInterface } from "../subscribe/subscribeInterface";

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
    profile: ProfileServiceInterface;
    subscription: SubscribeInterface;
    amount: number;
    status: string;
    payment_method: string;
    start_date: Date;
}
