"use client";

import {
    WarningCircle,
    ArrowClockwise,
} from "@phosphor-icons/react/dist/ssr";
import { useI18n } from "../../../locales/client";

export default function LoadingErrorContainer() {
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
                    background: "rgba(255, 107, 107, 0.1)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                }}>
                    <WarningCircle size={32} weight="duotone" color="#FF6B6B" />
                </div>

                <div style={{ textAlign: "center" }}>
                    {/* <h3 style={{
            color: "#ffffff",
            fontSize: 16,
            fontWeight: 700,
            margin: "0 0 6px 0",
          }}>
            {translate("errorMessage")}
          </h3> */}
                    <p style={{
                        color: "rgba(255,255,255,0.45)",
                        fontSize: 14,
                        margin: 0,
                        lineHeight: 1.5,
                    }}>
                        {translate("subTitleErrorMessage")}
                    </p>
                </div>

                <button
                    onClick={() => window.location.reload()}
                    style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 7,
                        background: "transparent",
                        border: "1px solid rgba(255,107,107,0.35)",
                        color: "#FF6B6B",
                        fontSize: 13,
                        fontWeight: 600,
                        borderRadius: 8,
                        padding: "9px 20px",
                        cursor: "pointer",
                        transition: "all 0.18s ease",
                    }}
                    onMouseEnter={e => {
                        (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,107,107,0.08)";
                        (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,107,107,0.6)";
                    }}
                    onMouseLeave={e => {
                        (e.currentTarget as HTMLButtonElement).style.background = "transparent";
                        (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,107,107,0.35)";
                    }}
                >
                    <ArrowClockwise size={15} weight="bold" />
                    {translate("retry")}
                </button>
            </div>
        );
    }
