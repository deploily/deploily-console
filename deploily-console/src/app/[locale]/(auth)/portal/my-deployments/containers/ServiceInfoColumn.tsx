"use client";
import { theme } from "@/styles/theme";
import { useState } from "react";
import { useI18n } from "../../../../../../../locales/client";
import DocumentationDrawer from "../../utils/documentationDrawer";
import ResourcesAndDocumentation, { DocUrl } from "./ResourcesAndDocumentation";
import ServiceHeader from "./ServiceHeader";
import SubscriptionStatusStrip from "./SubscriptionStatusStrip";
import { dockerDepInterface } from "@/lib/features/docker/dockerInterface";

interface ServiceInfoColumnProps {
  deployment: dockerDepInterface;
  remainingDuration: number;
}

function buildDocsUrls(deployment: dockerDepInterface  ): DocUrl[] {
  const urls: DocUrl[] = [];

  const addIfPresent = (url: string | undefined | null, type: DocUrl["type"]) => {
    if (url && url.trim() !== "") {
      urls.push({ type, url });
    }
  };

  addIfPresent(deployment.service_details?.documentation_url, "documentation");
  addIfPresent((deployment.service_details as any)?.admin_console_url, "adminConsole");
  //TODO ADD FORUM URL 
  addIfPresent((deployment.service_details as any)?.demo_url, "demoUrl");

  return urls;
}

export default function ServiceInfoColumn({
  deployment,
  remainingDuration,
}: ServiceInfoColumnProps) {
  const [openDrawer, setOpenDrawer] = useState(false);
  const t = useI18n();

  const docsUrls = buildDocsUrls(deployment);

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
        {deployment.service_details && (
          <ServiceHeader
            serviceDetails={deployment.service_details}
            status={deployment.status}
            deployment_status={deployment.deployment_status}
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
        startDate={deployment.start_date}
        durationMonth={deployment.duration_month}
        remainingDuration={remainingDuration}
        endDate={deployment.start_date}
      />

      {/* Drawer scoped to this column via getContainer={false} */}
      <DocumentationDrawer
        openDrawer={openDrawer}
        onClose={() => setOpenDrawer(false)}
        currentSubscription={deployment}
        t={t}
      />
    </div>
  );
}