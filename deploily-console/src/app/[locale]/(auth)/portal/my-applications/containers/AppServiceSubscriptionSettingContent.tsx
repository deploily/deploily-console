"use client";
import { OdooAppInterface } from "@/lib/features/odoo/odooInterface";
import { TtkEpayInterface } from "@/lib/features/ttk-epay/ttkEpayInterface";
import { theme } from "@/styles/theme";
import { Col, Row, Skeleton, Space, Typography } from "antd";
import { useEffect, useState } from "react";
import { useI18n } from "../../../../../../../locales/client";
import ManagedResourcePlanDetails from "./managedResourcePlanDetails";
import ServiceInfoColumn from "./ServiceInfoColumn";
import SubscriptionPlanCard from "./subscriptionplanCard";
import { SupabaseAppInterface } from "@/lib/features/supabase/supabaseInterface";
import { NextCloudAppInterface } from "@/lib/features/next-cloud/nextCloudInterface";
import { HiEventsAppInterface } from "@/lib/features/hi-events/hiEventsInterface";

export default function AppServiceSubscriptionSettingContent({
  appServiceSubscription,
  isLoading,
  paramsComponent,
}: {
    appServiceSubscription: TtkEpayInterface | OdooAppInterface | SupabaseAppInterface | NextCloudAppInterface | HiEventsAppInterface;
  isLoading: boolean;
  paramsComponent?: React.ReactNode;
}) {
  const t = useI18n();
  const [remainingDuration, setRemainingDuration] = useState<number>(0);

  useEffect(() => {
    if (appServiceSubscription !== undefined) {
      setRemainingDuration(
        getRemainingDuration(
          appServiceSubscription.start_date,
          appServiceSubscription.duration_month,
        ),
      );
    }
  }, [appServiceSubscription]);

  function getRemainingDuration(startDate: Date, durationMonths: number) {
    const start = new Date(startDate);
    const end = new Date(start);
    end.setMonth(end.getMonth() + durationMonths);
    const today = new Date();
    if (today >= end) return 0;
    return (
      (end.getFullYear() - today.getFullYear()) * 12 +
      (end.getMonth() - today.getMonth())
    );
  }

  const rightCol = (
    <>
      <Typography.Title level={2} style={{ color: theme.token.orange400 }}>
        {Intl.NumberFormat("fr-FR", { useGrouping: true }).format(
          appServiceSubscription?.total_amount / appServiceSubscription?.duration_month,
        )}{" "}
        DZD /{" "}
        {appServiceSubscription?.service_plan.subscription_category === "monthly"
          ? t("month")
          : t("year")}
      </Typography.Title>
      <SubscriptionPlanCard currentSubscription={appServiceSubscription} />
      <ManagedResourcePlanDetails currentSubscription={appServiceSubscription} />
    </>
  );

  return (
    <div style={{ maxWidth: 1400, margin: "0 auto", padding: "40px 24px" }}>
      {/* Loading state */}
      {isLoading && appServiceSubscription === undefined && (
        <>
          <Skeleton.Image active style={{ width: 300, height: 300 }} />
          <Skeleton active paragraph={{ rows: 6 }} style={{ marginTop: 24 }} />
        </>
      )}

      {/* Loaded state */}
      {!isLoading && appServiceSubscription !== undefined && (
        <Space direction="vertical" size={32} style={{ width: "100%" }}>
          <Row gutter={[32, 32]} align="stretch">

            {/* LEFT col — desktop layout:
                  ServiceInfoColumn on top, paramsComponent below (lg only)
                Mobile layout:
                  ServiceInfoColumn only (paramsComponent rendered separately below) */}
            <Col xs={24} lg={16}>
              <Space direction="vertical" size={32} style={{ width: "100%" }}>
                <ServiceInfoColumn
                  subscription={appServiceSubscription}
                  remainingDuration={remainingDuration}
                />
                {/* Desktop only: paramsComponent sits under ServiceInfoColumn */}
                {paramsComponent && (
                  <div style={{ display: "none" }} className="desktop-params">
                    {paramsComponent}
                  </div>
                )}
              </Space>
            </Col>

            {/* RIGHT col — price + plan cards, same on both breakpoints */}
            <Col xs={24} lg={8}>
              {rightCol}
            </Col>

          </Row>

          {/* Mobile only: paramsComponent appears after the right col */}
          {paramsComponent && (
            <div className="mobile-params">
              {paramsComponent}
            </div>
          )}
        </Space>
      )}

      {/* Responsive visibility styles */}
      <style>{`
        .desktop-params { display: block !important; }
        .mobile-params  { display: none; }

        @media (max-width: 991px) {
          .desktop-params { display: none !important; }
          .mobile-params  { display: block; }
        }
      `}</style>
    </div>
  );
}