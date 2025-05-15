import { ServicePlan, ServicePlanOption } from "@/lib/features/service-plans/servicePlanInterface";

import { theme } from "@/styles/theme";
import { Check } from "@phosphor-icons/react";
import { Button, Card, Col, Row, Typography } from 'antd';
import { useScopedI18n } from "../../../../../../../../locales/client";

const { Text } = Typography;

export default function RessourcePlanCard({ resourcePlan, showDrawer }: { resourcePlan: ServicePlan, showDrawer: any }) {
    const t = useScopedI18n('subscription');
    const percentage = 5;

    return (
        <Card
            style={{
                display: "flex",
                flexDirection: "column",
                height: "100%",
                borderColor: theme.token.gray50,
                boxShadow: "none"
            }}
            styles={{
                body: { flex: 1, display: "flex", flexDirection: "column", paddingBottom: 0 },
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = theme.token.orange600;
                e.currentTarget.style.boxShadow = `4px 4px 10px 0px ${theme.token.orange600}`;
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = theme.token.gray50;
                e.currentTarget.style.boxShadow = "none";
            }}
        >

            <Typography.Title level={3} style={{ textAlign: "center" }}>
                {(resourcePlan.plan !== null) ? resourcePlan.plan.name : ""}
            </Typography.Title>
            <div
                style={{
                    width: '100%',
                    height: 80,
                    backgroundImage: "url('/images/ellipse.png')",
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    backgroundSize: 'contain',
                    marginBottom: 20,
                    fontWeight: 'bold',
                    color: 'white',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Text style={{ fontSize: 18, color: 'white', lineHeight: 1 }}>{percentage}%</Text>
                <Text style={{ fontSize: 16, color: 'white', lineHeight: 1.2 }}>Special Offer</Text>
            </div>
            <Text
                delete
                style={{
                    color: '#999999',
                    fontSize: 16,
                    display: 'block', textAlign: "center", marginBottom: 0,
                    lineHeight: 1.2,
                }}
            >
                {Intl.NumberFormat('fr-FR', { useGrouping: true }).format(resourcePlan!.price)}
                <span style={{ fontSize: 16, fontWeight: 400 }}> DZD/{t("month")}</span>
            </Text>
            <Typography.Paragraph style={{ fontSize: 25, fontWeight: 600, color: theme.token.orange400, textAlign: "center" }}>
                {Intl.NumberFormat('fr-FR', { useGrouping: true }).format(applyDiscount(resourcePlan!.price, percentage))}
                <span style={{ fontSize: 16, fontWeight: 400 }}> DZD/{t("month")}</span>
            </Typography.Paragraph>

            <div style={{ flex: 1, paddingBottom: "16px" }}>
                {resourcePlan.options.map((row: ServicePlanOption) => (
                    <Row gutter={16} key={row.id} align="middle">
                        <Col span={3}  >
                            <Check size={24} color={theme.token.gray100} />
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
            <div
                style={{
                    padding: "16px",
                    display: "inline-block",
                }}
            >
                <Button
                    onClick={showDrawer}
                    style={{
                        color: theme.token.colorWhite,
                        backgroundColor: theme.token.orange600,
                        border: "none",
                        width: "100%",
                        paddingBlock: 20,
                        fontWeight: 600,
                        fontSize: 20,
                    }}
                >

                    Order Now
                </Button>
            </div>



        </Card>
    );
}
function applyDiscount(price: number, percentage: number): number {
    return Math.round(price * (1 - percentage / 100));
}