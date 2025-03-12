import { ServicePlan } from "@/lib/features/servicePlan/servicePlanInterface";
import { Button, Card, Typography } from "antd";
import Paragraph from "antd/es/typography/Paragraph";
import { useI18n } from "../../../../../../../../locales/client";
import { theme } from "@/styles/theme";

export default function ServicePlanCard({ servicePlan }: { servicePlan: ServicePlan }) {
    console.log("servicePlan=== ", servicePlan);
    const t = useI18n();

    return (
        <Card style={{ height: "100%", width: "100%", padding: 0 }}>
            <div style={{ height: "300px" }}>
                <Typography.Title level={3} style={{ paddingBottom: 20, textAlign: "center" }}>
                    {servicePlan.plan.name}
                </Typography.Title>
                <Paragraph style={{ fontSize: 20, }}>
                    {servicePlan.limit}
                </Paragraph>
                <Paragraph style={{ fontSize: 20, }}>
                    Standard Support
                </Paragraph>
                <Paragraph style={{ fontSize: 20, }}>
                    Location Module
                </Paragraph>
                <div
                    style={{
                        position: "absolute",
                        bottom: "20px", left: 0,
                        width: "100%",
                        display: "flex",
                        justifyContent: "center"
                    }}
                >
                    <Button
                        style={{
                            color: "rgba(220, 233, 245, 0.88)",
                            backgroundColor: theme.token.orange_7,
                            border: "none",
                            width: "90%",
                            paddingBlock: 20,
                            fontWeight: 600,
                            fontSize: 20,
                        }}
                    >
                        {t("subscrib")}
                    </Button>
                </div>
            </div>
        </Card>
    )
}