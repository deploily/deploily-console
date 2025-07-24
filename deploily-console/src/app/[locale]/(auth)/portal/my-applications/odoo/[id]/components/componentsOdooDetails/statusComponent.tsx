import { Col, Row, Tag, Tooltip, Typography } from "antd";
import { useI18n, useScopedI18n } from "../../../../../../../../../../locales/client";
import { PauseCircle, PlayCircle } from "@phosphor-icons/react";
import { applicationStatusStyle } from "@/app/[locale]/(auth)/portal/my-api/utils/subscriptionsConst";


export default function StatusComponents({ odooAppById }: { odooAppById: any }) {
    const t = useI18n();
    const tSubscription = useScopedI18n('subscription');

    return (
        <>
            <Row gutter={16} style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
            }}>
            {odooAppById.service_details &&
                <Typography.Title level={2}>
                    {odooAppById.service_details.name}
                    {odooAppById.status === "active" ?
                        <Tooltip placement="rightTop" title={t('subscription.active')} color={"green"}>
                            <PlayCircle size={24} weight="bold" style={{ marginLeft: 10, color: "green" }} />
                        </Tooltip>
                        :
                        <Tooltip placement="rightTop" title={t('subscription.inactive')} color={"red"}>
                            <PauseCircle size={24} weight="bold" style={{ marginLeft: 10, color: "red" }} />
                        </Tooltip>
                    }
                </Typography.Title>}
            <Col xs={24} md={12} lg={8}>
                <Row gutter={[16, 10]} justify="end" >
                    <Tag bordered={false} color={applicationStatusStyle(odooAppById.application_status)}
                        style={{ height: 'fit-content', fontSize: '14px', fontWeight: "bold", borderRadius: 20, padding: "5px 20px", textTransform: "capitalize" }}>
                        {tSubscription(odooAppById.application_status as "processing" | "error" | "deployed")}
                    </Tag>
                </Row>
                </Col>
                </Row>
        </>
    );
}