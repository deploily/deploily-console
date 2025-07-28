"use client";

import { ApiServiceSubscriptionInterface } from "@/lib/features/api-service-subscriptions/apiServiceSubscriptionInterface";
import { handleCopy } from "@/lib/utils/handleCopy";
import { CustomTypography } from "@/styles/components/typographyStyle";
import { theme } from "@/styles/theme";
import { Copy } from "@phosphor-icons/react";
import { Button, Col, Row, Typography } from "antd";
import SyntaxHighlighter from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/hljs";



export const subscriptionItems = (row: ApiServiceSubscriptionInterface, serviceDetails: any, t: any) => [
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
                    <CustomTypography> {serviceDetails.service_url} </CustomTypography>
                </Col>
                <Col span={4} style={{ display: "flex", alignItems: "start", justifyContent: "end" }} >
                    <Button type="primary" style={{ boxShadow: "none" }} icon={<Copy />} onClick={() => handleCopy(serviceDetails.service_url)} />
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
                {serviceDetails.curl_command !== undefined && serviceDetails.curl_command !== "" &&
                    <div style={{ position: 'relative', maxHeight: '400px', overflowY: 'auto', borderRadius: '8px' }}>
                        <SyntaxHighlighter language="bash" style={dracula} customStyle={{ height: "100%" }} wrapLongLines >
                            {serviceDetails.curl_command}
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
                        }} icon={<Copy />} onClick={() => handleCopy(serviceDetails.curl_command)} />
                    </div>
                }
            </>
        ),
    },


];
