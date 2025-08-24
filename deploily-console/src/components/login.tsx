"use client";
import { SignIn, UserPlus } from '@phosphor-icons/react/dist/ssr';
import { Button, Col, Row } from "antd";
import { signIn } from "next-auth/react";
import { useCurrentLocale, useI18n } from "../../locales/client";


export default function Login() {
    const t = useI18n();
    const locale = useCurrentLocale();

    return (
        <Row gutter={[16, 16]}>
            {/* Login Button */}
            <Col span={12}>
                <Button
                    style={{
                        width: "100%",
                        color: "#fff",
                        height: "100px",
                        backgroundColor: "#D85912",
                        border: "none",
                    }}
                    onClick={() =>
                        signIn("keycloak", {
                            callbackUrl: `/${locale}/portal/dashboard`,
                        })
                    }
                >
                    <Col style={{ paddingBottom: "10px" }}>
                        <SignIn style={{ fontSize: 30, color: "#fff", marginBottom: "10px" }} />
                        <span
                            style={{
                                color: "rgba(220, 233, 245, 0.88)",
                                textAlign: "center",
                                fontSize: "16px",
                                fontWeight: 600,
                                display: "flex",
                                justifyContent: "center",
                            }}
                        >
                            {t("login")}
                        </span>
                    </Col>
                </Button>
            </Col>

            {/* Register Button */}
            <Col span={12}>
                <Button
                    style={{
                        width: "100%",
                        color: "#fff",
                        height: "100px",
                        backgroundColor: "#1E88E5",
                        border: "none",
                    }}
                    onClick={() =>
                        signIn("keycloak",
                            { callbackUrl: `/${locale}/portal/dashboard` },
                            { prompt: "create" }
                        )
                    }
                >
                    <Col style={{ paddingBottom: "10px" }}>
                        <UserPlus style={{ fontSize: 30, color: "#fff", marginBottom: "10px" }} />
                        <span
                            style={{
                                color: "rgba(220, 233, 245, 0.88)",
                                textAlign: "center",
                                fontSize: "16px",
                                fontWeight: 600,
                                display: "flex",
                                justifyContent: "center",
                            }}
                        >
                            {t("register")}
                        </span>
                    </Col>
                </Button>
            </Col>
        </Row>
    );
}
