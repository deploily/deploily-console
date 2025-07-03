import {ServicePlan, ServicePlanOption} from "@/lib/features/service-plans/servicePlanInterface";
import {theme} from "@/styles/theme";
import {Check} from "@phosphor-icons/react/dist/ssr";
import {Button, Card, Col, Row, Typography} from "antd";
import {useScopedI18n} from "../../../../../../../../locales/client";
import {useApiServices} from "@/lib/features/api-service/apiServiceSelectors";

export default function ServicePlanCard({
  servicePlan,
  showDrawer,
  disabled = false,
  IsSubscribed
}: {
  servicePlan: ServicePlan;
  showDrawer: any;
  disabled?: boolean;
    IsSubscribed?: boolean;
}) {
  const t = useScopedI18n("apiServiceSubscription");
  const { currentService } = useApiServices();

  return (
    <Card
      style={{
        height: "100%",
        width: "100%",
        maxWidth: 300,
        minWidth: 200,
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        opacity: disabled ? 0.5 : 1,
        cursor: disabled ? "not-allowed" : "default",
        pointerEvents: disabled ? "none" : "auto",
      }}
      styles={{
        body: { flex: 1, display: "flex", flexDirection: "column", paddingBottom: 0 },
      }}
      onMouseEnter={(e) => {
        if (!disabled && !currentService?.is_subscribed) {
          e.currentTarget.style.borderColor = theme.token.orange600;
          e.currentTarget.style.boxShadow = `4px 4px 10px 0px ${theme.token.orange600}`;
        }
      }}
      onMouseLeave={(e) => {
        if (!disabled) {
          e.currentTarget.style.borderColor = theme.token.gray50;
          e.currentTarget.style.boxShadow = "none";
        }
      }}
    >
      <Typography.Title level={3} style={{ textAlign: "center" }}>
        {servicePlan.plan !== null ? servicePlan.plan.name : ""}
      </Typography.Title>

      <Typography.Paragraph
        style={{ fontSize: 25, fontWeight: 600, color: theme.token.orange400, textAlign: "center" }}
      >
        {Intl.NumberFormat("fr-FR", { useGrouping: true }).format(servicePlan.price)}
        <span style={{ fontSize: 16, fontWeight: 400 }}>
          {" "}
          DZD/
          {servicePlan.subscription_category === "monthly"
            ? t("month")
            : servicePlan.subscription_category === "yearly"
              ? t("year")
              : t("month")}
        </span>
      </Typography.Paragraph>

      <div style={{ flex: 1, paddingBottom: "16px" }}>
        {servicePlan.options.map((row: ServicePlanOption) => (
          <Row gutter={16} key={row.id} align="middle">
            <Col span={3}>
              {row.icon ? row.icon : <Check size={24} color={theme.token.gray100} />}
            </Col>
            <Col span={21}>
              <Typography.Paragraph
                style={{
                  fontSize: 16,
                  color: theme.token.gray100,
                  margin: 0,
                  display: "flex",
                  alignItems: "center",
                  minHeight: 24,
                }}
              >
                <div
                  dangerouslySetInnerHTML={{ __html: row.html_content }}
                  style={{ margin: 0, lineHeight: "24px" }}
                />
              </Typography.Paragraph>
            </Col>
          </Row>
        ))}
      </div>

      <div style={{ padding: "16px", display: "inline-block" }}>
        <Button
          onClick={showDrawer}
          disabled={disabled}
          style={{
            color: theme.token.colorWhite,
            backgroundColor: theme.token.orange600,
            border: "none",
            width: "100%",
            paddingBlock: 20,
            fontWeight: 600,
            fontSize: 20,
            cursor: disabled ? "not-allowed" : "pointer",
            opacity: disabled ? 0.5 : 1,
          }}
        >
          {disabled ? ("currentPlan") : t("title")}
        </Button>
      </div>
    </Card>
  );
}
