"use client";
import { getRegistrationUrl } from "@/actions/getRegistrationUrl";
import { Button, Col, Row } from "antd";
import { signIn } from "next-auth/react";
import { useCurrentLocale, useI18n } from "../../locales/client";

export default function Login() {
    const t = useI18n();
    const locale = useCurrentLocale();
    async function handleRegister() {
        const callbackUrl = `/${locale}/portal/home`;
        const registrationUrl = await getRegistrationUrl(callbackUrl);
        window.location.href = registrationUrl.toString();
    }
    return (
        <Row gutter={[16, 16]}>
            <Col xs={24} md={12}>
                <Button
                    style={{
                        width: "100%",
                        height: "48px",
                        backgroundColor: "#D85912",
                        border: "none",
                    }}
                    onClick={() => signIn("keycloak", { callbackUrl: `/${locale}/portal/home` })}
                >
                    <span
                        style={{
                            color: "rgba(220, 233, 245, 0.88)",
                            fontSize: "16px",
                            fontWeight: 600,
                        }}
                    >
                        {t("login")}
                    </span>
                </Button>
            </Col>

            <Col xs={24} md={12}>
                <Button
                    style={{
                        width: "100%",
                        height: "48px",
                        backgroundColor: "#5394CC",
                        border: "none",
                    }}
                    onClick={handleRegister}
                >
                    <span
                        style={{
                            color: "#FFFFFF",
                            fontSize: "16px",
                            fontWeight: 600,
                        }}
                    >
                        {t("register")}
                    </span>
                </Button>
            </Col>
        </Row>
    );
}
