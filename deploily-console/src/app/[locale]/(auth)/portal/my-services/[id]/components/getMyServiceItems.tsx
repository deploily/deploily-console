"use client";

import { Button, Col, CollapseProps, Row, Tooltip, Typography } from "antd";
import { theme } from "@/styles/theme";
import { SubscribeInterface } from "@/lib/features/subscribe/subscribeInterface";
import { CustomTypography } from "@/styles/components/typographyStyle";
import { handleCopy } from "@/lib/utils/handleCopy";
import { Copy } from "@phosphor-icons/react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/hljs";



export const getMyServiceItems = (row: SubscribeInterface, t: any): CollapseProps["items"] => [
    {
        key: "1",
        label: (
            <Typography.Title level={4} style={{ fontWeight: 700, fontSize: 24, color: theme.token.orange_7 }}>
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

            <Typography.Title level={4} style={{ fontWeight: 700, fontSize: 24, color: theme.token.orange_7 }}>
                {t("documentation")}
            </Typography.Title>

        ),
        children: (
            <>
                <CustomTypography>
                    {t('viewApiDocumentation')}
                </CustomTypography>
                {row.service_details.curl_command !== undefined && row.service_details.curl_command !== "" &&
                    < Row gutter={12}>
                        <Col span={16}>
                            <SyntaxHighlighter language="bash" style={dracula}>
                                {row.service_details.curl_command}
                            </SyntaxHighlighter>
                        </Col>
                        <Col span={8} style={{ display: "flex", alignItems: "center" }}>
                            <Tooltip title="Copy">
                                <Button type="primary" style={{ boxShadow: "none" }} icon={<Copy />} onClick={() => handleCopy(row.service_details.curl_command)} />
                            </Tooltip>
                        </Col>
                    </Row>
                }
            </>
        ),
    },


];
