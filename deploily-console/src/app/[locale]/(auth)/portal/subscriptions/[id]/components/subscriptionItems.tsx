"use client";

import { SubscriptionInterface } from "@/lib/features/subscriptions/subscriptionInterface";
import { handleCopy } from "@/lib/utils/handleCopy";
import { CustomTypography } from "@/styles/components/typographyStyle";
import { theme } from "@/styles/theme";
import { Copy } from "@phosphor-icons/react";
import { Button, Col, Row, Typography } from "antd";
import SyntaxHighlighter from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/hljs";



export const subscriptionItems = (row: SubscriptionInterface, t: any) => [
    {
        key: "1",
        label: (
            <Typography.Title level={4} style={{ fontWeight: 700, fontSize: 24, color: theme.token.orange600 }}>
                {t("accessUrl")}
            </Typography.Title>
        ),
        children: (
            <Row>
                <Col span={20} style={{ display: "flex", justifyContent: "start" }} >
                    <CustomTypography> {row.service_details.service_url} </CustomTypography>
                </Col>
                <Col span={4} style={{ display: "flex", alignItems: "start", justifyContent: "end" }} >
                    <Button type="primary" style={{ boxShadow: "none" }} icon={<Copy />} onClick={() => handleCopy(row.service_details.service_url)} />
                </Col>
            </Row>
        ),
    },
    {
        key: "2",
        label: (

            <Typography.Title level={4} style={{ fontWeight: 700, fontSize: 24, color: theme.token.orange600 }}>
                {"CURL"}
            </Typography.Title>

        ),
        children: (
            <>
                {row.service_details.curl_command !== undefined && row.service_details.curl_command !== "" &&
                    <div style={{ position: 'relative', maxHeight: '400px', overflowY: 'auto', borderRadius: '8px' }}>
                            <SyntaxHighlighter language="bash" style={dracula} customStyle={{ height: "100%" }} wrapLongLines >
                                {row.service_details.curl_command}
                            </SyntaxHighlighter>
                        <Button type="primary" style={{
                            boxShadow: "none",
                            position: 'absolute',
                            top: '8px',
                            right: '8px',
                            zIndex: 1,
                            background: '#333',
                            color: '#fff',
                            border: 'none',
                            padding: '4px 8px',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            fontSize: '0.85rem',
                        }} icon={<Copy />} onClick={() => handleCopy(row.service_details.curl_command)} />
                    </div>
                }
            </>
        ),
    },


];
