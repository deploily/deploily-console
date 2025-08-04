import { Col, Row, Tag, Tooltip, Typography } from "antd";
import { useI18n, useScopedI18n } from "../../../../../../../../../../locales/client";
import { PauseCircle, PlayCircle } from "@phosphor-icons/react";
import { applicationStatusStyle } from "@/app/[locale]/(auth)/portal/my-api/utils/subscriptionsConst";
import RenewMyAppSubscriptionComponents from "../../../../components/renewMyAppSubscription";
import UpgradeMyAppSubscriptionComponents from "../../../../components/upgradeMyAppSubscription";
import { useState } from "react";
import ShowdrawerSubscription from "../../../../components/showMyAppDrawerSubscription";


export default function StatusComponents({ supabaseAppById }: { supabaseAppById: any }) {
    const t = useI18n();
    const tSubscription = useScopedI18n('subscription');
    const [drawerActionType, setDrawerActionType] = useState<"upgrade" | "renew" | null>(null);

    return (
        <>
            <Row gutter={16} style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
            }}>
                {supabaseAppById.service_details &&
                    <Typography.Title level={2}>
                        {supabaseAppById.service_details.name}
                        {supabaseAppById.status === "active" ?
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
                        <Tag bordered={false} color={applicationStatusStyle(supabaseAppById.application_status)}
                            style={{ height: 'fit-content', fontSize: '14px', fontWeight: "bold", borderRadius: 20, padding: "5px 20px", textTransform: "capitalize" }}>
                            {tSubscription(supabaseAppById.application_status as "processing" | "error" | "deployed")}
                        </Tag>
                        {supabaseAppById.status === 'active' && (
                            <div style={{
                                display: 'flex',
                                gap: '8px',
                                flexWrap: 'wrap',
                                justifyContent: 'flex-end'
                            }}>
                                <UpgradeMyAppSubscriptionComponents
                                    serviceId={supabaseAppById.service_details.id}
                                    oldPrice={supabaseAppById.price}
                                    start_date={supabaseAppById.start_date}
                                    onClick={() =>
                                        setDrawerActionType("upgrade")
                                    }
                                />
                                <RenewMyAppSubscriptionComponents
                                    serviceId={supabaseAppById.service_details.id}
                                    oldPrice={supabaseAppById.price}
                                    start_date={supabaseAppById.start_date}
                                    duration={supabaseAppById.duration_month}
                                    plan={supabaseAppById.service_plan.id}
                                    selectedVpsPlan={supabaseAppById.ressource_service_plan.id}
                                    onClick={() =>
                                        setDrawerActionType("renew")
                                    }
                                />
                            </div>
                        )}
                    </Row>
                </Col>
            </Row>

            <ShowdrawerSubscription
                serviceId={supabaseAppById.service_details.id}
                isSubscribed={supabaseAppById.service_details.is_subscribed}
                subscriptionOldId={supabaseAppById.id}
                drawerType={drawerActionType}
            />
        </>
    );
}