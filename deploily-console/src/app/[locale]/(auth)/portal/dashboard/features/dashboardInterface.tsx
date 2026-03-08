
export interface DashboardResponse {
  "api_subscriptions": number,
  "app_subscriptions": number,
  "deployment_subscriptions": number,
    "expiring_soon": 
      {
        "duration_month": number,
        "expiry_date": string,
        "id": number,
        "name": string,
        "payment_status": string,
        "price": number,
        "service_plan": string,
        "start_date": string,
        "status": string,
        "total_amount": number
      }[],
    "my_favorites": number,
    "support_tickets": number

}