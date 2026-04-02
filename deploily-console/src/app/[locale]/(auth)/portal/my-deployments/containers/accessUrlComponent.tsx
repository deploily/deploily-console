"use client";
import { handleCopy } from "@/lib/utils/handleCopy";
import {
    Copy,
    LinkSimple
} from "@phosphor-icons/react";
import {
    Button,
    Typography
} from "antd";
import { useScopedI18n } from "../../../../../../../locales/client";

export default function AccessUrlComponent({ access_url }: { access_url: string }) {
    const tSubscription = useScopedI18n("subscription");

    return (
            <div
                style={{
                    marginBottom: "20px",
                    background: "#1a1a1a",
                    borderRadius: 14,
                    border: "1px solid #2a2a2a",
                    overflow: "hidden",
                }}
            >
                {/* Header */}
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        padding: "18px 20px 14px",
                        gap: 10,
                    }}
                >
                    <div
                        style={{
                            width: 4,
                            height: 22,
                            background: "#4f8ef7",
                            borderRadius: 2,
                        }}
                    />
                    <Typography.Title
                        level={5}
                        style={{ color: "#fff", margin: 0, fontSize: 16, fontWeight: 600 }}
                    >
                        {tSubscription("accessUrl")}
                    </Typography.Title>
                </div>

                <div style={{ padding: "0 20px 20px" }}>
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            background: "#0d0d0d",
                            padding: "10px 14px",
                            borderRadius: 8,
                            border: "1px solid #2a2a2a",
                            gap: 10,
                        }}
                    >
                        <span
                            style={{
                                flex: 1,
                                color: "#e0e0e0",
                                fontSize: 13,
                                fontFamily: "monospace",
                                wordBreak: "break-all",
                            }}
                        >
                            {access_url}
                        </span>
                        <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
                            <Button
                                type="text"
                                size="small"
                                icon={<LinkSimple size={16} color="#888" />}
                                onClick={() => window.open(access_url, "_blank")}
                                style={{ padding: "0 6px", height: 28 }}
                            />
                            <Button
                                type="text"
                                size="small"
                                icon={<Copy size={16} color="#888" />}
                                onClick={() => handleCopy(access_url)}
                                style={{ padding: "0 6px", height: 28 }}
                            />
                        </div>
                    </div>
                </div>
            </div>
    );
}