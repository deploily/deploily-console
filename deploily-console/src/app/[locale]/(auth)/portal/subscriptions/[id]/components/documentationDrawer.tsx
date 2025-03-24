import { theme } from "@/styles/theme";
import { Copy } from "@phosphor-icons/react";
import { Button, Col, Drawer, Row, Tooltip, Typography } from "antd";
import { SubscribeInterface } from "@/lib/features/subscribe/subscribeInterface";
import { handleCopy } from "@/lib/utils/handleCopy";
import { CustomTypography } from "@/styles/components/typographyStyle";
import SyntaxHighlighter from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { CustomDrawerCard } from "@/styles/components/cardStyle";

export default function DocumentationDrawer({ openDrawer, onClose, currentSubscribe, t }: { openDrawer: any, onClose: any, currentSubscribe: SubscribeInterface, t: any }) {
    return (
        <Drawer
            title="Documentation"
            placement="right"
            onClose={onClose}
            open={openDrawer}
            getContainer={false}
            width={600}
            styles={{
                header: { borderBottom: "none", backgroundColor: theme.token.darkGray_1 },
                body: { padding: 0, backgroundColor: theme.token.darkGray_1 },
            }}
        >
            <CustomDrawerCard style={{
                display: "flex",
                flexDirection: "column",
                margin: 20,
                borderColor: theme.token.gray_1,
                boxShadow: "none",

            }}>
                <Row>
                    <Col span={24}>
                        <Typography.Title level={4} style={{ fontWeight: 700, fontSize: 24, color: theme.token.orange_7 }}>
                            {t("accessUrl")}
                        </Typography.Title>
                    </Col>
                    <Col span={20} style={{ display: "flex", justifyContent: "start" }} >
                        <CustomTypography> {currentSubscribe.service_details.service_url} </CustomTypography>
                    </Col>
                    <Col span={4} style={{ display: "flex", alignItems: "start", justifyContent: "end" }} >
                        <Button type="primary" style={{ boxShadow: "none" }} icon={<Copy />} onClick={() => handleCopy(currentSubscribe.service_details.service_url)} />
                    </Col>
                    <Col span={24}>
                        <Typography.Title level={4} style={{ fontWeight: 700, fontSize: 24, color: theme.token.orange_7 }}>
                            {t("documentation")}
                        </Typography.Title>
                    </Col>
                    <Col span={24}>
                        <CustomTypography style={{ marginBottom: 8 }}>
                            {t('viewApiDocumentation')}
                        </CustomTypography>
                    </Col>
                    <Col span={24} style={{ display: "flex", justifyContent: "start" }} >

                        {currentSubscribe.service_details.curl_command !== undefined && currentSubscribe.service_details.curl_command !== "" &&
                            < Row gutter={12}>
                                <Col md={22} xs={20}>
                                    <SyntaxHighlighter language="bash" style={dracula} customStyle={{ height: "100%" }} >
                                        {currentSubscribe.service_details.curl_command}
                                    </SyntaxHighlighter>
                                </Col>
                                <Col md={2} xs={4} style={{ display: "flex", alignItems: "center", justifyContent: "end" }}>
                                    <Tooltip title="Copy">
                                        <Button type="primary" style={{ boxShadow: "none" }} icon={<Copy />} onClick={() => handleCopy(currentSubscribe.service_details.curl_command)} />
                                    </Tooltip>
                                </Col>
                            </Row>
                        }
                    </Col>
                </Row>
            </CustomDrawerCard>
        </Drawer>
    )
}