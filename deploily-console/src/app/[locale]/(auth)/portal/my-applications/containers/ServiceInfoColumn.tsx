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

interface ServiceInfoColumnProps {
  subscription: TtkEpayInterface | OdooAppInterface;
  remainingDuration: number;
}

/**
 * Collects all non-empty URL fields from the subscription and its
 * service_details into a typed DocUrl list for ResourcesAndDocumentation.
 */
function buildDocsUrls(subscription: TtkEpayInterface | OdooAppInterface): DocUrl[] {
  const urls: DocUrl[] = [];

  const addIfPresent = (url: string | undefined | null, type: DocUrl["type"]) => {
    if (url && url.trim() !== "") {
      urls.push({ type, url });
    }
  };

  // From service_details
  addIfPresent(subscription.service_details?.documentation_url, "documentation");
  // addIfPresent(subscription.service_details?.admin_console_url, "adminConsole");//TODO 

  // From the subscription itself (present on both OdooAppInterface & TtkEpayInterface)
  addIfPresent(subscription.console_url, "consoleUrl");

  // demo_url is only on OdooAppInterface
  if ("demo_url" in subscription) {
    addIfPresent((subscription as OdooAppInterface).demo_url, "demoUrl");
  }

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
    <>
      <div>
        {/* Decorative radial glow */}
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
          }}
        />

        <div style={{ padding: "28px 0px 0" }}>
          {/* Service Header */}
          {subscription.service_details && (
            <ServiceHeader
              serviceDetails={subscription.service_details}
              status={subscription.status}
            />
          )}

          {/* Divider */}
          <div style={{ height: 1, background: "#1f1f1f", marginBottom: 28 }} />

          {/* Resources & Documentation — renders nothing if docsUrls is empty */}
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
          endDate={subscription.start_date} // TODO: replace with actual end date
        />
      </div>

      <DocumentationDrawer
        openDrawer={openDrawer}
        onClose={() => setOpenDrawer(false)}
        currentSubscription={subscription}
        t={t}
      />
    </>
  );
}