"use client";
import federatedLogout from "@/lib/utils/federatedLogout";
import { useI18n } from "../../locales/client";
import { Button } from "antd";

export default function Logout() {
    const t = useI18n();
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
            onClick={() => federatedLogout()}
        >
            <span
                style={{
                    color: "rgba(220, 233, 245, 0.88)",

                    fontSize: "16px",
                    fontWeight: 600,
                }}
            >
                {t("logout")}
            </span>
        </Button>
    );
}

