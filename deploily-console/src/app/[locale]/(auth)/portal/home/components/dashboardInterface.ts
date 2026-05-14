// Dashboard interfaces example
// Place this in: app/portal/dashboard/features/dashboardInterface.ts

export interface DashboardResponse {
  api_subscriptions: number;
  deployment_subscriptions: number;
  app_subscriptions: number;
  support_tickets: number;
  my_favorites: number;
  expiring_soon: PaymentInterface[];
}

export interface PaymentInterface {
  id: number;
  service_plan: string;
  name: string;
  total_amount: number;
  start_date: Date;
  expiry_date: Date;
  status: string;
}
