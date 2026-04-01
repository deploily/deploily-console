"use client";
import { TtkEpayInterface } from "@/lib/features/ttk-epay/ttkEpayInterface";
import { Col, Row, Skeleton, Space } from "antd";
import { useEffect, useState } from "react";
import ServiceInfoColumn from "./ServiceInfoColumn";
import SubscriptionPlanCard from "./subscriptionplanCard";
import { OdooAppInterface } from "@/lib/features/odoo/odooInterface";
import ManagedResourcePlanDetails from "./managedResourcePlanDetails";

export default function AppServiceSubscriptionSettingContent({
  appServiceSubscription, isLoading
}: {
  //? This component is used for all Applications subscriptions, so we need to allow for either type
    appServiceSubscription: TtkEpayInterface | OdooAppInterface;
  isLoading: boolean;
}) {
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

  return (
    <div
      style={{
        maxWidth: 1400,
        margin: "0 auto",
        padding: "40px 24px",
      }}
    >
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
            {/* LEFT — Service Info Column */}
            <Col xs={24} lg={16}>
              <ServiceInfoColumn
                subscription={appServiceSubscription}
                remainingDuration={remainingDuration}
              />
            </Col>

            {/* RIGHT — Pricing Card */}
            <Col xs={24} lg={8}>
              <SubscriptionPlanCard currentSubscription={appServiceSubscription} />
              <ManagedResourcePlanDetails currentSubscription={appServiceSubscription} />
            </Col>
          </Row>
        </Space>
      )}
    </div>
  );
}
