import { ServicePlan, ServicePlanOption } from "@/lib/features/servicePlan/servicePlanInterface";
import { Button, Card, Col, Row, Typography } from "antd";
import { useI18n } from "../../../../../../../../locales/client";
import { theme } from "@/styles/theme";

export default function ServicePlanCard({ servicePlan, showDrawer }: { servicePlan: ServicePlan, showDrawer: any }) {
    const t = useI18n();
    return (
        <Card
            style={{
                display: "flex",
                flexDirection: "column",
                height: "100%",
                borderColor: theme.token.gray_1,
                boxShadow: "none"
            }}
            styles={{
                body: { flex: 1, display: "flex", flexDirection: "column", paddingBottom: 0  },
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = theme.token.orange_7;
                e.currentTarget.style.boxShadow = `4px 4px 10px 0px ${theme.token.orange_7}`;
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = theme.token.gray_1;
                e.currentTarget.style.boxShadow = "none";
            }}
        >

            <Typography.Title level={3} style={{ textAlign: "center" }}>
                {servicePlan.plan.name}
            </Typography.Title>

            <Typography.Paragraph style={{ fontSize: 25, fontWeight: 600, color: theme.token.orange_6, textAlign: "center" }}>
                {Intl.NumberFormat('fr-FR', { useGrouping: true }).format(servicePlan.price)}
                <span style={{ fontSize: 16, fontWeight: 400 }}> DZD/Month</span>
            </Typography.Paragraph>

            <div style={{ flex: 1, paddingBottom: "16px" }}>
                {servicePlan.options.map((row: ServicePlanOption) => (
                    <Row gutter={16} key={row.id} align="middle">
                        <Col span={2}>
                            <Typography.Paragraph style={{ fontSize: 25, color: theme.token.gray_0 }}>
                                {row.icon}
                            </Typography.Paragraph>
                        </Col>
                        <Col span={22}>
                            <Typography.Paragraph style={{ fontSize: 16, color: theme.token.gray_0 }}>
                                <div dangerouslySetInnerHTML={{ __html: row.html_content }} />
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
                        backgroundColor: theme.token.orange_7,
                        border: "none",
                        width: "100%",
                        paddingBlock: 20,
                        fontWeight: 600,
                        fontSize: 20,
                    }}
                >
                    {t("subscrib")}
                </Button>
            </div>
        </Card>







    )
}