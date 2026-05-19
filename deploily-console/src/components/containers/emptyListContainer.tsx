"use client";

import { Empty } from "@phosphor-icons/react";
import { useI18n } from "../../../locales/client";

export default function EmptyListContainer() {
    const translate = useI18n();

    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "48px 24px",
            gap: 16,
        }}>
            <div style={{
                width: 64,
                height: 64,
                borderRadius: "50%",
                background: "rgba(255, 122, 0, 0.08)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
            }}>
                <Empty size={32} weight="duotone" color="#ff7a00" />
            </div>

            <div style={{ textAlign: "center" }}>
                <p style={{
                    color: "rgba(255,255,255,0.45)",
                    fontSize: 14,
                    margin: 0,
                    lineHeight: 1.5,
                }}>
                    {translate("emptyList")}
                </p>
            </div>
        </div>
    );
}