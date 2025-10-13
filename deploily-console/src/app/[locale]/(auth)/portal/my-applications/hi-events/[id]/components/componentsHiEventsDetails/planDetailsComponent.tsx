"use client";
import { CustomTypography } from "@/styles/components/typographyStyle";
import { theme } from "@/styles/theme";
import { Col, Row, Typography, Collapse } from "antd";
import { CaretDown, CaretUp } from "@phosphor-icons/react";
import { useI18n } from "../../../../../../../../../../locales/client";

export default function PlanDetailsComponent({ hiEventsAppById }: { hiEventsAppById: any }) {
    const t = useI18n();

    return (
        <>
            {hiEventsAppById.get_plan_details && (
                <Collapse
                    bordered={false}
                    defaultActiveKey={["0"]}
                    expandIcon={({ isActive }) => (
                        isActive ? <CaretUp size={24} color={theme.token.orange600} /> : <CaretDown size={24} color={theme.token.orange600} />
                    )}
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
                                <Typography.Title
                                    level={4}
                                    style={{ margin: 0, color: theme.token.orange600 }}
                                >
                                    {t("planDetails")}
                                </Typography.Title>
                            ),
                            children: (
                                <>
                                    {/* === PLAN INFORMATION === */}
                                    <Row gutter={[24, 12]} style={{ marginBottom: 10 }}>
                                        {/* Plan Name */}
                                        <Col xs={24} md={8}>
                                            <Row align="middle" gutter={[8, 0]}>
                                                <Col flex="none">
                                                    <CustomTypography style={{ fontWeight: 500 }}>
                                                        {t("planName")} :
                                                    </CustomTypography>
                                                </Col>
                                                <Col flex="auto">
                                                    <Typography.Text
                                                        strong
                                                        style={{ whiteSpace: "nowrap" }}
                                                    >
                                                        {hiEventsAppById.get_plan_details.plan?.name ||
                                                            hiEventsAppById.name}
                                                    </Typography.Text>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>

                                    {/* === PLAN OPTIONS === */}
                                    {Array.isArray(hiEventsAppById.get_plan_details.options) &&
                                        hiEventsAppById.get_plan_details.options.length > 0 && (
                                            <Col span={24} style={{ marginTop: 10 }}>
                                                <CustomTypography style={{ fontWeight: "bold" }}>
                                                    {t("planOptions")}
                                                </CustomTypography>

                                                <div style={{ marginTop: 10 }}>
                                                    {hiEventsAppById.get_plan_details.options.map(
                                                        (option: any) => (
                                                            <div
                                                                key={option.id}
                                                                style={{
                                                                    display: "flex",
                                                                    alignItems: "center",
                                                                    background:
                                                                        theme.token.darkGray,
                                                                    borderRadius: 12,
                                                                    padding: "8px 14px",
                                                                    marginBottom: 6,
                                                                }}
                                                            >
                                                                {/* === ICON (emoji) === */}
                                                                <Typography.Text
                                                                    style={{
                                                                        fontSize: 18,
                                                                        marginRight: 10,
                                                                        lineHeight: 1,
                                                                    }}
                                                                >
                                                                    {option.icon || "🔹"}
                                                                </Typography.Text>

                                                                {/* === CONTENT === */}
                                                                <Typography.Text
                                                                    style={{ fontSize: 14 }}
                                                                >
                                                                    {option.html_content ||
                                                                        `${option.type}: ${option.value ?? ""
                                                                        }`}
                                                                </Typography.Text>
                                                            </div>
                                                        )
                                                    )}
                                                </div>
                                            </Col>
                                        )}
                                </>
                            ),
                        },
                    ]}
                />
            )}
        </>
    );
}
