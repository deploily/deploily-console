"use client";
import { CustomTypography } from "@/styles/components/typographyStyle";
import { theme } from "@/styles/theme";
import { Col, Row, Typography, Collapse } from "antd";
import { useI18n } from "../../../../../../../../../locales/client";
import { CaretDown, CaretUp } from "@phosphor-icons/react";

export default function ManagedRessourceComponent({ ttkEpayById }: { ttkEpayById: any }) {
    const t = useI18n();

    return (
        <>
            {ttkEpayById.managed_ressource && (
                <Collapse
                    bordered={false}
                    defaultActiveKey={["0"]}
                    expandIcon={({ isActive }) => (
                        isActive ? <CaretUp size={24} color={theme.token.orange600} /> : <CaretDown size={24} color={theme.token.orange600} />
                    )}
                    expandIconPosition="end"
                    style={{
                        marginTop: 20,
                        background: theme.token.darkGray,
                        borderRadius: 12,
                        overflow: "hidden",
                    }}
                    items={[
                        {
                            key: "1",
                            label: (
                                <Typography.Title
                                    level={4}
                                    style={{ margin: 0, color: theme.token.orange600 }}
                                >
                                {"Managed Resource Details"}
                                </Typography.Title>
                            ),
                            children: (
                                <>
                                   
                                </>
                            ),
                        },
                    ]}
                />
            )}
        </>
    );
}
