"use client";
import { theme } from "@/styles/theme";
import { Col, Row, Typography } from "antd";
import { useState } from "react";
import { useI18n } from "../../../../../../locales/client";
import RenewApiSubscriptionComponents from "../my-api/[id]/components/renewSubscription";
import ShowdrawerSubscription from "../my-api/[id]/components/showDrawerSubscription";
import UpgradeApiSubscriptionComponents from "../my-api/[id]/components/upgradeSubscription";

export default function PlanDetailsComponent({
  currentSubscription,
}: {
  currentSubscription: any;
}) {
  const t = useI18n();
  const [drawerActionType, setDrawerActionType] = useState<"upgrade" | "renew" | null>(null);

  return (
    <>
      <Row gutter={[24, 24]} style={{ alignItems: "stretch" }}>

        {/* LEFT — PLAN DETAILS */}
        {currentSubscription.get_plan_details && (
          <Col xs={24} lg={currentSubscription.get_managed_ressource_plan_details ? 12 : 24}>
            <div
              style={{
                background: "linear-gradient(145deg, #161616 0%, #111 100%)",
                borderRadius: 20,
                border: "1px solid #242424",
                overflow: "hidden",
                height: "100%",
                position: "relative",
              }}
            >
              {/* Top accent bar */}
              <div
                style={{
                  height: 3,
                  background: `linear-gradient(90deg, ${theme.token.orange600}, ${theme.token.orange600}50, transparent)`,
                }}
              />

              <div style={{ padding: "24px 24px 0" }}>
                {/* Header */}
                <div style={{ marginBottom: 20 }}>
                  <Typography.Text
                    style={{
                      fontSize: 10,
                      fontWeight: 600,
                      color: theme.token.orange600,
                      textTransform: "uppercase",
                      letterSpacing: "1.2px",
                      display: "block",
                      marginBottom: 6,
                    }}
                  >
                    {t("planDetails")}
                  </Typography.Text>
                  <Typography.Title
                    level={3}
                    style={{
                      margin: 0,
                      color: "#fff",
                      fontSize: 24,
                      fontWeight: 700,
                      letterSpacing: "-0.5px",
                    }}
                  >
                    {currentSubscription.get_plan_details.plan?.name ||
                      currentSubscription.name}
                  </Typography.Title>
                </div>

                {/* Divider */}
                <div style={{ height: 1, background: "#1f1f1f", marginBottom: 20 }} />

                {/* Options */}
                {Array.isArray(currentSubscription.get_plan_details.options) &&
                  currentSubscription.get_plan_details.options.length > 0 && (
                    <div style={{ marginBottom: 24 }}>
                      <Typography.Text
                        style={{
                          fontSize: 10,
                          fontWeight: 600,
                          color: "#555",
                          textTransform: "uppercase",
                          letterSpacing: "1.2px",
                          display: "block",
                          marginBottom: 12,
                        }}
                      >
                        {t("planOptions")}
                      </Typography.Text>

                      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                        {currentSubscription.get_plan_details.options.map((option: any) => (
                          <div
                            key={option.id}
                            style={{
                              display: "flex",
                              alignItems: "flex-start",
                              gap: 12,
                              padding: "12px 16px",
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
                            <div
                              style={{
                                width: 34,
                                height: 34,
                                borderRadius: 10,
                                background: `${theme.token.orange600}15`,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontSize: 16,
                                flexShrink: 0,
                              }}
                            >
                              {option.icon || "🔹"}
                            </div>
                            <div style={{ flex: 1, paddingTop: 2 }}>
                              <Typography.Text
                                style={{ fontSize: 14, color: "#fff", lineHeight: 1.5, fontWeight: 500 }}
                              >
                                {option.html_content || `${option.type}: ${option.value ?? ""}`}
                              </Typography.Text>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
              </div>

              {/* Action buttons — footer strip */}
              {currentSubscription.status === "active" && (
                <div
                  style={{
                    background: "#0a0a0a",
                    borderTop: "1px solid #1a1a1a",
                    padding: "16px 24px",
                    display: "flex",
                    flexDirection: "column",
                    gap: 10,
                  }}
                >
                  <RenewApiSubscriptionComponents
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
                  />
                </div>
              )}
            </div>
          </Col>
        )}

        {/* RIGHT — MANAGED RESOURCE PLAN DETAILS */}
        {currentSubscription.get_managed_ressource_plan_details && (
          <Col xs={24} lg={12}>
            <div
              style={{
                background: "linear-gradient(145deg, #161616 0%, #111 100%)",
                borderRadius: 20,
                border: "1px solid #242424",
                overflow: "hidden",
                height: "100%",
                position: "relative",
              }}
            >
              {/* Top accent bar — blue for managed resource */}
              <div
                style={{
                  height: 3,
                  background: "linear-gradient(90deg, #4f8ef7, #4f8ef750, transparent)",
                }}
              />

              <div style={{ padding: "24px 24px 0" }}>
                {/* Header */}
                <div style={{ marginBottom: 20 }}>
                  <Typography.Text
                    style={{
                      fontSize: 10,
                      fontWeight: 600,
                      color: "#4f8ef7",
                      textTransform: "uppercase",
                      letterSpacing: "1.2px",
                      display: "block",
                      marginBottom: 6,
                    }}
                  >
                    {t("managedResourceplanDetails")}
                  </Typography.Text>
                  <Typography.Title
                    level={3}
                    style={{
                      margin: 0,
                      color: "#fff",
                      fontSize: 24,
                      fontWeight: 700,
                      letterSpacing: "-0.5px",
                    }}
                  >
                    {currentSubscription.get_managed_ressource_plan_details.plan?.name ||
                      currentSubscription.name}
                  </Typography.Title>
                </div>

                {/* Divider */}
                <div style={{ height: 1, background: "#1f1f1f", marginBottom: 20 }} />

                {/* Options */}
                {Array.isArray(currentSubscription.get_managed_ressource_plan_details.options) &&
                  currentSubscription.get_managed_ressource_plan_details.options.length > 0 && (
                    <div style={{ marginBottom: 24 }}>
                      <Typography.Text
                        style={{
                          fontSize: 10,
                          fontWeight: 600,
                          color: "#555",
                          textTransform: "uppercase",
                          letterSpacing: "1.2px",
                          display: "block",
                          marginBottom: 12,
                        }}
                      >
                        {t("planOptions")}
                      </Typography.Text>

                      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                        {currentSubscription.get_managed_ressource_plan_details.options.map(
                          (option: any) => (
                            <div
                              key={option.id}
                              style={{
                                display: "flex",
                                alignItems: "flex-start",
                                gap: 12,
                                padding: "12px 16px",
                                background: "#4f8ef708",
                                borderRadius: 12,
                                border: "1px solid #4f8ef715",
                                transition: "all 0.2s ease",
                                cursor: "default",
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.background = "#4f8ef712";
                                e.currentTarget.style.borderColor = "#4f8ef730";
                                e.currentTarget.style.transform = "translateX(4px)";
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.background = "#4f8ef708";
                                e.currentTarget.style.borderColor = "#4f8ef715";
                                e.currentTarget.style.transform = "translateX(0)";
                              }}
                            >
                              <div
                                style={{
                                  width: 34,
                                  height: 34,
                                  borderRadius: 10,
                                  background: "#4f8ef715",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  fontSize: 16,
                                  flexShrink: 0,
                                }}
                              >
                                {option.icon || "🔹"}
                              </div>
                              <div style={{ flex: 1, paddingTop: 2 }}>
                                <Typography.Text
                                  style={{ fontSize: 14, color: "#fff", lineHeight: 1.5, fontWeight: 500 }}
                                >
                                  {option.html_content || `${option.type}: ${option.value ?? ""}`}
                                </Typography.Text>
                              </div>
                            </div>
                          ),
                        )}
                      </div>
                    </div>
                  )}
              </div>
            </div>
          </Col>
        )}
      </Row>

      <ShowdrawerSubscription
        IsSubscribed={currentSubscription.service_details.is_subscribed}
        subscriptionOldId={currentSubscription.id}
        drawerType={drawerActionType}
      />
    </>
  );
}