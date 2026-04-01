"use client";
import { DivCard } from "@/styles/components/divStyle";
import { theme } from "@/styles/theme";
import { Row, Typography } from "antd";
import { useI18n } from "../../../../../../../locales/client";

export default function SubscriptionPlanCard({
  currentSubscription,
}: {
  currentSubscription: any;
}) {
  const t = useI18n();
  // const [drawerActionType, setDrawerActionType] = useState<"upgrade" | "renew" | null>(null);

  return (
    <>
      <Row gutter={[24, 24]} style={{ alignItems: "stretch" }}>
        {currentSubscription.get_plan_details && (
          <DivCard
            style={{
              background: theme.token.darkGray,
              borderRadius: 16,
              paddingLeft: 16,
              paddingRight: 16,
              height: "100%",
              border: `1px solid ${theme.token.orange600}20`,
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Accent line at top */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: 3,
                background: `linear-gradient(90deg, ${theme.token.orange600}, ${theme.token.orange600}80)`,
              }}
            />

            {/* Plan Name Header */}
            <Row style={{ marginBottom: 10 }}>
              <Typography.Title
                level={3}
                style={{
                  margin: 0,
                  color: "#fff",
                  fontSize: 28,
                  fontWeight: 700,
                  letterSpacing: "-0.5px",
                }}
              >
                {currentSubscription.get_plan_details.plan?.name ||
                  currentSubscription.name}
              </Typography.Title>
              {/* <Typography.Title level={2} style={{ color: theme.token.orange400 }}>
                {Intl.NumberFormat("fr-FR", { useGrouping: true }).format(
                  currentSubscription.total_amount / currentSubscription.duration_month,
                )}{" "}
                DZD {currentSubscription.service_plan?.unity} /{" "}
                {currentSubscription.service_plan.subscription_category === "monthly"
                  ? t("month")
                  : t("year")}
              </Typography.Title> */}
            </Row>

            {/* OPTIONS */}
            {Array.isArray(currentSubscription.get_plan_details.options) &&
              currentSubscription.get_plan_details.options.length > 0 && (
                <div style={{ marginTop: 10 }}>
                  <Typography.Text
                    style={{
                      fontSize: 12,
                      fontWeight: 600,
                      color: theme.token.orange600,
                      textTransform: "uppercase",
                      letterSpacing: "1px",
                      display: "block",
                      marginBottom: 5,
                    }}
                  >
                    {t("planOptions")}
                  </Typography.Text>

                  <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                    {currentSubscription.get_plan_details.options.map((option: any) => (
                      <div
                        key={option.id}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 12,
                          padding: "4px 5px",
                          background: `${theme.token.orange600}08`,
                          borderRadius: 12,
                          border: `1px solid ${theme.token.orange600}15`,
                          transition: "all 0.2s ease",
                          cursor: "default",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = `${theme.token.orange600}12`;
                          e.currentTarget.style.borderColor = `${theme.token.orange600}25`;
                          e.currentTarget.style.transform = "translateX(4px)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = `${theme.token.orange600}08`;
                          e.currentTarget.style.borderColor = `${theme.token.orange600}15`;
                          e.currentTarget.style.transform = "translateX(0)";
                        }}
                      >
                        {/* Icon */}
                        <div
                          style={{
                            width: 36,
                            height: 36,
                            borderRadius: 10,
                            background: `${theme.token.orange600}15`,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: 18,
                            flexShrink: 0,
                          }}
                        >
                          {option.icon || "🔹"}
                        </div>

                        {/* Content */}
                        <div style={{ flex: 1, paddingTop: 2 }}>
                          <Typography.Text
                            style={{
                              fontSize: 15,
                              color: "#fff",
                              lineHeight: 1.5,
                              fontWeight: 500,
                            }}
                          >
                            {option.html_content || `${option.type}: ${option.value ?? ""}`}
                          </Typography.Text>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            {/* Action Buttons */}
            {currentSubscription.status === "active" && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 12,
                  marginTop: 16,
                }}
              >
                {/* <RenewApiSubscriptionComponents
                  serviceId={currentSubscription.service_details.id}
                  oldPrice={currentSubscription.price}
                  plan={currentSubscription.service_plan_id}
                  start_date={currentSubscription.start_date}
                  onClick={() => setDrawerActionType("renew")}
                />
                <UpgradeApiSubscriptionComponents
                  serviceId={currentSubscription.service_details.id}
                  oldPrice={currentSubscription.price}
                  planSelectedId={currentSubscription.service_plan_id}
                  start_date={currentSubscription.start_date}
                  oldDuration={currentSubscription.duration_month}
                  onClick={() => setDrawerActionType("upgrade")}
                /> */}
              </div>
            )}
          </DivCard>
        )}
      </Row>

      {/* <ShowdrawerSubscription
        IsSubscribed={currentSubscription.service_details.is_subscribed}
        subscriptionOldId={currentSubscription.id}
        drawerType={drawerActionType}
      /> */}
    </>
  );
}