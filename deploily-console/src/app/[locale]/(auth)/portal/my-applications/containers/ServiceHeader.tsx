import ImageFetcher from "@/lib/utils/imageFetcher";
import { theme } from "@/styles/theme";
import { PauseCircle, PlayCircle } from "@phosphor-icons/react";
import { Col, Tag, Tooltip, Typography } from "antd";
import Paragraph from "antd/es/typography/Paragraph";
import { useI18n, useScopedI18n } from "../../../../../../../locales/client";
import { applicationStatusStyle } from "../../my-api/utils/subscriptionsConst";

interface ServiceDetails {
  image_service: string;
  name: string;
  short_description: string;
}

interface ServiceHeaderProps {
  serviceDetails: ServiceDetails;
  status: string;
  application_status:string
}

export default function ServiceHeader({ serviceDetails, status, application_status }: ServiceHeaderProps) {
  const tSubscription = useScopedI18n("subscription");

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

          <Tag
            bordered={false}
            color={applicationStatusStyle(application_status)}
            style={{
              height: "fit-content",
              fontSize: "14px",
              fontWeight: "bold",
              borderRadius: 20,
              padding: "5px 20px",
              textTransform: "capitalize",
            }}
          >
            {tSubscription(
              application_status as "processing" | "error" | "deployed",
            )}
          </Tag>
          <Col
            span={24}
            style={{
              display: "flex",
              justifyContent: "end",
              alignSelf: "start",
            }}
          >
            {/* <Typography.Title level={2} style={{ color: theme.token.orange400 }}>
              {Intl.NumberFormat("fr-FR", { useGrouping: true }).format(
              total_amount / duration_month,
              )}{" "}
              DZD /{" "}
              {subscription_category === "monthly"
                ? t("month")
                : t("year")}
            </Typography.Title> */}
          </Col>
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
