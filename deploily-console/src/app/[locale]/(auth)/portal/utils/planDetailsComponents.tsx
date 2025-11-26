"use client";
import { DivCard } from "@/styles/components/divStyle";
import { CustomTypography } from "@/styles/components/typographyStyle";
import { theme } from "@/styles/theme";
import { CaretDown, CaretUp } from "@phosphor-icons/react";
import { Col, Collapse, Row, Typography } from "antd";
import { useI18n } from "../../../../../../locales/client";

export default function PlanDetailsComponent({ currentSubscription }: { currentSubscription: any }) {
  const t = useI18n();

  return (
    <>
      {(currentSubscription.get_plan_details ||
        currentSubscription.get_managed_ressource_plan_details) && (
          <Collapse
            bordered={false}
            defaultActiveKey={["1"]}
            expandIcon={({ isActive }) =>
              isActive ? (
                <CaretUp size={24} color={theme.token.orange600} />
              ) : (
                <CaretDown size={24} color={theme.token.orange600} />
              )
            }
            expandIconPosition="end"
            style={{
              marginTop: 20,
              background: theme.token.darkGray,
              borderRadius: 12,
              overflow: "hidden",
            }}
            items={[
              {
                key: "1",
                label: (
                  <Typography.Title level={3} style={{ margin: 0, color: theme.token.orange600 }}>
                    {t("planDetailsTitle")}
                  </Typography.Title>
                ),
                children: (
                  <Row gutter={[32, 32]} style={{ alignItems: "stretch" }}>
                    {/* LEFT COLUMN — NORMAL PLAN DETAILS */}
                    {currentSubscription.get_plan_details && (
                      <Col xs={24} md={12} style={{ marginBottom: 10 }}>
                        <DivCard style={{ marginTop: 20, height: "90%" }}>
                          <Typography.Title
                            level={5}
                            style={{ marginBottom: 15, color: theme.token.orange600 }}
                          >
                            {t("planDetails")}
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
                                    {currentSubscription.get_plan_details.plan?.name ||
                                      currentSubscription.name}
                                  </Typography.Text>
                                </Col>
                              </Row>
                            </Col>
                          </Row>

                          {/* OPTIONS */}
                          {Array.isArray(currentSubscription.get_plan_details.options) &&
                            currentSubscription.get_plan_details.options.length > 0 && (
                              <div style={{ marginTop: 10 }}>
                                <CustomTypography style={{ fontWeight: "bold" }}>
                                  {t("planOptions")}
                                </CustomTypography>

                                <div style={{ marginTop: 10 }}>
                                  {currentSubscription.get_plan_details.options.map((option: any) => (
                                    <div
                                      key={option.id}
                                      style={{
                                        display: "flex",
                                        alignItems: "center",
                                        // background: theme.token.darkGray,
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
                                        {option.html_content || `${option.type}: ${option.value ?? ""}`}
                                      </Typography.Text>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                        </DivCard>
                      </Col>
                    )}
                    {/* RIGHT COLUMN — MANAGED RESOURCE PLAN DETAILS */}
                    {currentSubscription.get_managed_ressource_plan_details && (
                      <Col xs={24} md={12} style={{ marginBottom: 10 }}>
                        <DivCard style={{ marginTop: 20, height: "90%" }}>
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
                                          // background: theme.token.darkGray,
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
                ),
              },
            ]}
          />
        )}
    </>
  );
}