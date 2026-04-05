"use client";
import { OdooAppInterface } from "@/lib/features/odoo/odooInterface";
import { TtkEpayInterface } from "@/lib/features/ttk-epay/ttkEpayInterface";
import { theme } from "@/styles/theme";
import { useState } from "react";
import { useI18n } from "../../../../../../../locales/client";
import DocumentationDrawer from "../../utils/documentationDrawer";
import ResourcesAndDocumentation, { DocUrl } from "./ResourcesAndDocumentation";
import ServiceHeader from "./ServiceHeader";
import SubscriptionStatusStrip from "./SubscriptionStatusStrip";
import { SupabaseAppInterface } from "@/lib/features/supabase/supabaseInterface";
import { NextCloudAppInterface } from "@/lib/features/next-cloud/nextCloudInterface";
import { HiEventsAppInterface } from "@/lib/features/hi-events/hiEventsInterface";

interface ServiceInfoColumnProps {
  subscription: TtkEpayInterface | OdooAppInterface | SupabaseAppInterface | NextCloudAppInterface | HiEventsAppInterface;
  remainingDuration: number;
}

function buildDocsUrls(subscription: TtkEpayInterface | OdooAppInterface | SupabaseAppInterface | NextCloudAppInterface | HiEventsAppInterface ): DocUrl[] {
  const urls: DocUrl[] = [];

  const addIfPresent = (url: string | undefined | null, type: DocUrl["type"]) => {
    if (url && url.trim() !== "") {
      urls.push({ type, url });
    }
  };

  addIfPresent(subscription.service_details?.documentation_url, "documentation");
  addIfPresent((subscription.service_details as any)?.admin_console_url, "adminConsole");
  addIfPresent(subscription.console_url, "consoleUrl");
  addIfPresent((subscription.service_details as any)?.demo_url, "demoUrl");

  return urls;
}

export default function ServiceInfoColumn({
  subscription,
  remainingDuration,
}: ServiceInfoColumnProps) {
  const [openDrawer, setOpenDrawer] = useState(false);
  const t = useI18n();

  const docsUrls = buildDocsUrls(subscription);

  return (
    <div style={{ position: "relative", overflow: "hidden" }}>
      <div
        style={{
          position: "absolute",
          top: -60,
          left: -60,
          width: 220,
          height: 220,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${theme.token.orange600}08 0%, transparent 70%)`,
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <div style={{ padding: "28px 0px 0", position: "relative", zIndex: 1 }}>
        {/* Service Header */}
        {subscription.service_details && (
          <ServiceHeader
            serviceDetails={subscription.service_details}
            status={subscription.status}
            application_status={subscription.application_status}
          />
        )}

        {/* Divider */}
        <div style={{ height: 1, background: "#1f1f1f", marginBottom: 28 }} />

        {/* Resources & Documentation */}
        <ResourcesAndDocumentation
          docsUrls={docsUrls}
          onMoreDetailsClick={() => setOpenDrawer(true)}
        />
      </div>

      {/* Subscription Status Strip */}
      <SubscriptionStatusStrip
        startDate={subscription.start_date}
        durationMonth={subscription.duration_month}
        remainingDuration={remainingDuration}
        endDate={new Date(
          new Date(subscription.start_date).setMonth(
            new Date(subscription.start_date).getMonth() + subscription.duration_month
          )
        )}
      />

      {/* Drawer scoped to this column via getContainer={false} */}
      <DocumentationDrawer
        openDrawer={openDrawer}
        onClose={() => setOpenDrawer(false)}
        currentSubscription={subscription}
        t={t}
      />
    </div>
  );
}