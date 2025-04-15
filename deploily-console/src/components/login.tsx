"use client";
import { signIn } from "next-auth/react";
import { useCurrentLocale, useI18n } from "../../locales/client";
import { Button } from "antd";


export default function Login() {
    const t = useI18n();
    const locale = useCurrentLocale();

    return (

        <Button
            style={{
                width: "100%",
                color: "#fff",
                height: "40px",
                backgroundColor: "#D85912",
                border: "none",
                marginBottom: "20px",
            }}
            // href="/portal/home"
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
    );
}
