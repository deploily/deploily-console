"use client";
import { DivCard } from "@/styles/components/divStyle";
import { CustomTypography } from "@/styles/components/typographyStyle";
import { theme } from "@/styles/theme";
import { Col, Row, Typography } from "antd";
import { useState } from "react";
import { useI18n } from "../../../../../../locales/client";
import RenewApiSubscriptionComponents from "../my-api/[id]/components/renewSubscription";
import ShowdrawerSubscription from "../my-api/[id]/components/showDrawerSubscription";
import UpgradeApiSubscriptionComponents from "../my-api/[id]/components/upgradeSubscription";

export default function PlanDetailsComponent({ currentSubscription }: { currentSubscription: any }) {
  const t = useI18n();
  const [drawerActionType, setDrawerActionType] = useState<"upgrade" | "renew" | null>(null);

  //TODO RECHECK IN OTHER PAGES

  return (
    <>

      <Row gutter={[24, 24]} style={{ alignItems: "stretch", marginTop: 24 }}>
        {/* LEFT COLUMN — ENHANCED PLAN DETAILS */}
        {currentSubscription.get_plan_details && (
          <Col xs={24} lg={12}>
            <DivCard
              style={{
                background: theme.token.darkGray,
                borderRadius: 16,
                padding: 32,
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
              <div style={{ marginBottom: 24 }}>
                <Typography.Text
                  style={{
                    fontSize: 11,
                    fontWeight: 600,
                    color: theme.token.orange600,
                    textTransform: "uppercase",
                    letterSpacing: "1.2px",
                    display: "block",
                    marginBottom: 8,
                  }}
                >
                  {t("planDetails")}
                </Typography.Text>
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
              </div>

              {/* OPTIONS */}
              {Array.isArray(currentSubscription.get_plan_details.options) &&
                currentSubscription.get_plan_details.options.length > 0 && (
                  <div style={{ marginTop: 32 }}>
                    <Typography.Text
                      style={{
                        fontSize: 12,
                        fontWeight: 600,
                        color: theme.token.orange600,
                        textTransform: "uppercase",
                        letterSpacing: "1px",
                        display: "block",
                        marginBottom: 16,
                      }}
                    >
                      {t("planOptions")}
                    </Typography.Text>

                    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                      {currentSubscription.get_plan_details.options.map((option: any) => (
                        <div
                          key={option.id}
                          style={{
                            display: "flex",
                            alignItems: "flex-start",
                            gap: 12,
                            padding: "14px 16px",
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
                    marginTop: 32,
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

            </DivCard>


          </Col>
        )}

        {/* RIGHT COLUMN — MANAGED RESOURCE PLAN DETAILS (ORIGINAL DESIGN) */}
        {currentSubscription.get_managed_ressource_plan_details && (
          <Col xs={24} lg={12}>
            <DivCard style={{ marginTop: 0, height: "100%" }}>
              <Typography.Title
                level={5}
                style={{ marginBottom: 15, color: theme.token.orange600 }}
              >
                {t("managedResourceplanDetails")}
              </Typography.Title>

              {/* PLAN NAME */}
              <Row gutter={[24, 12]} style={{ marginBottom: 10 }}>
                <Col xs={24}>
                  <Row align="middle" gutter={[8, 0]}>
                    <Col flex="none">
                      <CustomTypography style={{ fontWeight: 500 }}>
                        {t("planName")} :
                      </CustomTypography>
                    </Col>
                    <Col flex="auto">
                      <Typography.Text strong style={{ whiteSpace: "nowrap" }}>
                        {currentSubscription.get_managed_ressource_plan_details.plan
                          ?.name || currentSubscription.name}
                      </Typography.Text>
                    </Col>
                  </Row>
                </Col>
              </Row>

              {/* OPTIONS */}
              {Array.isArray(
                currentSubscription.get_managed_ressource_plan_details.options,
              ) &&
                currentSubscription.get_managed_ressource_plan_details.options.length >
                0 && (
                  <div style={{ marginTop: 10 }}>
                    <CustomTypography style={{ fontWeight: "bold" }}>
                      {t("planOptions")}
                    </CustomTypography>

                    <div style={{ marginTop: 10 }}>
                      {currentSubscription.get_managed_ressource_plan_details.options.map(
                        (option: any) => (
                          <div
                            key={option.id}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              borderRadius: 12,
                              padding: "8px 14px",
                              marginBottom: 6,
                            }}
                          >
                            <Typography.Text
                              style={{
                                fontSize: 18,
                                marginRight: 10,
                                lineHeight: 1,
                              }}
                            >
                              {option.icon || "🔹"}
                            </Typography.Text>

                            <Typography.Text style={{ fontSize: 14 }}>
                              {option.html_content ||
                                `${option.type}: ${option.value ?? ""}`}
                            </Typography.Text>
                          </div>
                        ),
                      )}
                    </div>
                  </div>
                )}
            </DivCard>
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