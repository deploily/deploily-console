import ImageFetcher from "@/lib/utils/imageFetcher";
import { theme } from "@/styles/theme";
import { PauseCircle, PlayCircle } from "@phosphor-icons/react";
import { Tooltip, Typography } from "antd";
import Paragraph from "antd/es/typography/Paragraph";
import { useI18n, useScopedI18n } from "../../../../../../../locales/client";

interface ServiceDetails {
  image_service: string;
  name: string;
  short_description: string;
}

interface ServiceHeaderProps {
  serviceDetails: ServiceDetails;
  status: string;
}

export default function ServiceHeader({ serviceDetails, status }: ServiceHeaderProps) {
  const tApiServiceSubscription = useScopedI18n("apiServiceSubscription");
  const t = useI18n();

  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: 20,
        marginBottom: 28,
      }}
    >
      {/* Logo */}
      <div
        style={{
          width: 80,
          height: 80,
          borderRadius: 16,
          background: "#1e1e1e",
          border: `1px solid ${theme.token.orange600}20`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          flexShrink: 0,
          boxShadow: `0 4px 20px ${theme.token.orange600}10`,
        }}
      >
        <ImageFetcher
          imagePath={serviceDetails.image_service}
          width={60}
          height={60}
        />
      </div>

      {/* Title + Status + Description */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            flexWrap: "wrap",
            marginBottom: 6,
          }}
        >
          <Typography.Title
            level={2}
            style={{ margin: 0, fontSize: 26, fontWeight: 700, lineHeight: 1.2 }}
          >
            {serviceDetails.name}
          </Typography.Title>

          <Typography.Title level={2} style={{ margin: 0, fontSize: 26, fontWeight: 700, lineHeight: 1.2 }}
          >
            {status === "active" ? (
              <Tooltip placement="rightTop" title={t("subscription.active")} color={"green"}>
                <PlayCircle size={24} weight="bold" style={{ marginLeft: 10, color: "green" }} />
              </Tooltip>
            ) : (
              <Tooltip placement="rightTop" title={t("subscription.inactive")} color={"red"}>
                <PauseCircle size={24} weight="bold" style={{ marginLeft: 10, color: "red" }} />
              </Tooltip>
            )}
          </Typography.Title>

          {/* <Tag
            bordered={false}
            color={subscriptionStatusStyle(status)}
            style={{
              fontSize: 10,
              fontWeight: 700,
              borderRadius: 20,
              padding: "3px 10px",
              textTransform: "uppercase",
              letterSpacing: "0.8px",
            }}
          >
            {tApiServiceSubscription(status as "active" | "inactive")}
          </Tag> */}
        </div>

        <Paragraph
          style={{
            fontSize: 14,
            color: "#888",
            margin: 0,
            fontStyle: "italic",
            lineHeight: 1.6,
          }}
        >
          {serviceDetails.short_description}
        </Paragraph>
      </div>
    </div>
  );
}
