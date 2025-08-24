"use client";
import { SignIn } from '@phosphor-icons/react/dist/ssr';
import { Button, Col } from "antd";
import { signIn } from "next-auth/react";
import { useCurrentLocale, useI18n } from "../../locales/client";


export default function Login() {
    const t = useI18n();
    const locale = useCurrentLocale();

    return (

        <Button
            style={{
                width: "100%",
                color: "#fff",
                height: "100px",
                backgroundColor: "#D85912",
                border: "none",
                marginBottom: "20px",
            }}
            // href="/portal/home"
            onClick={() => signIn("keycloak", { callbackUrl: `/${locale}/portal/dashboard` })}
        >
            <Col style={{ paddingBottom: "10px" }}>
                <SignIn style={{ fontSize: 30, color: '#fff', marginBottom: "10px" }} />
                <span
                    style={{
                        color: "rgba(220, 233, 245, 0.88)",
                        textAlign: "center",
                        fontSize: "16px",
                        fontWeight: 600,
                        flexWrap: "wrap",
                        display: "flex",
                        justifyContent: "center",

                    }}
                >
                    {t("login_Register")}
                </span>
            </Col>
        </Button>
    );
}
