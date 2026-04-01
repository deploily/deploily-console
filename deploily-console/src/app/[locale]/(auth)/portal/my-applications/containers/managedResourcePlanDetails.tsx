"use client";
import { DivCard } from "@/styles/components/divStyle";
import { theme } from "@/styles/theme";
import { Row, Typography } from "antd";
import { useI18n } from "../../../../../../../locales/client";

export default function ManagedResourcePlanDetails({
    currentSubscription,
}: {
    currentSubscription: any;
}) {
    const t = useI18n();

    if (!currentSubscription.get_managed_ressource_plan_details) return null;

    const details = currentSubscription.get_managed_ressource_plan_details;
    const planName = details.plan?.name || currentSubscription.name;
    const options: any[] = Array.isArray(details.options) ? details.options : [];

    return (
        <Row gutter={[24, 24]} style={{ alignItems: "stretch" }}>
            {currentSubscription.get_plan_details && (
                        <DivCard
                            style={{
                                background: "transparent",
                                padding: 0,
                                position: "relative",
                            }}
                        >
                            {/* Accent line at top */}
                            <div
                                style={{
                                    position: "absolute",
                                    top: -16,
                                    left: 0,
                                    right: 0,
                                    height: 3,
                                    background: `linear-gradient(90deg, ${theme.token.orange600}, ${theme.token.orange600}80)`,
                                }}
                            />

                            {/* Plan Name */}
                            <div style={{ marginBottom: 16 }}>
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
                                    {planName}
                                </Typography.Title>
                            </div>

                            {/* Plan Options */}
                            {options.length > 0 && (
                                <div>
                                    <Typography.Text
                                        style={{
                                            fontSize: 12,
                                            fontWeight: 600,
                                            color: theme.token.orange600,
                                            textTransform: "uppercase",
                                            letterSpacing: "1px",
                                            display: "block",
                                            marginBottom: 10,
                                        }}
                                    >
                                        {t("planOptions")}
                                    </Typography.Text>

                                    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                                        {options.map((option: any) => (
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
                        </DivCard>)}
                        </Row>
                 
    );
}