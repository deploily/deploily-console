"use client";
import { Button } from "antd";
import { signIn } from "next-auth/react";
import { useCurrentLocale, useI18n } from "../../locales/client";


export default function Login() {
    const t = useI18n();
    const locale = useCurrentLocale();

    return (

        <Button
            style={{
                width: "80%",
                color: "#fff",
                height: "80px",
                backgroundColor: "#D85912",
                border: "none",
                marginBottom: "20px",
            }}
            // href="/portal/home"
            onClick={() => signIn("keycloak", { callbackUrl: `/${locale}/portal/dashboard` })}
        >
            
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
        </Button>
    );
}
