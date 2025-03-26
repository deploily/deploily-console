export interface SubscriptionResponse {
  form_url: string;
  order_id: string;
    subscription:Subscription;
  }


  export interface Subscription {
    id: number;
    duration_month: number;
    name: string;
    price:number
    promo_code_id:number;
    service_plan_id:number;
    start_date:Date;
    status: string;
    total_amount: number;
  }
  