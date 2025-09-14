import { applicationStatusStyle } from "@/app/[locale]/(auth)/portal/my-api/utils/subscriptionsConst";
import { PauseCircle, PlayCircle } from "@phosphor-icons/react";
import { Col, Row, Tag, Tooltip, Typography } from "antd";
import { useState } from "react";
import { useI18n, useScopedI18n } from "../../../../../../../../../../locales/client";
import ShowdrawerSubscription from "../../../../components/showMyAppDrawerSubscription";
import UpgradeMyAppSubscriptionComponents from "../../../../components/upgradeMyAppSubscription";
import RenewMyAppSubscriptionComponents from "../../../../components/renewMyAppSubscription";


export default function StatusComponents({ nextCloudAppById }: { nextCloudAppById: any }) {
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
                {nextCloudAppById.service_details &&
                    <Typography.Title level={2}>
                        {nextCloudAppById.service_details.name}
                        {nextCloudAppById.status === "active" ?
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
                        <Tag bordered={false} color={applicationStatusStyle(nextCloudAppById.application_status)}
                            style={{ height: 'fit-content', fontSize: '14px', fontWeight: "bold", borderRadius: 20, padding: "5px 20px", textTransform: "capitalize" }}>
                            {tSubscription(nextCloudAppById.application_status as "processing" | "error" | "deployed")}
                        </Tag>
                        {nextCloudAppById.status === 'active' && (
                            <div style={{
                                display: 'flex',
                                gap: '8px',
                                flexWrap: 'wrap',
                                justifyContent: 'flex-end'
                            }}>
                                <UpgradeMyAppSubscriptionComponents
                                    serviceId={nextCloudAppById.service_details.id}
                                    oldPrice={nextCloudAppById.total_amount}
                                    start_date={nextCloudAppById.start_date}
                                    onClick={() =>
                                        setDrawerActionType("upgrade")
                                    }
                                />
                                <RenewMyAppSubscriptionComponents
                                    serviceId={nextCloudAppById.service_details.id}
                                    oldPrice={nextCloudAppById.total_amount}
                                    start_date={nextCloudAppById.start_date}
                                    duration={nextCloudAppById.duration_month}
                                    plan={nextCloudAppById.service_plan.id}
                                    selectedVpsPlan={nextCloudAppById.managed_ressource_details?.id}
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
                serviceId={nextCloudAppById.service_details.id}
                isSubscribed={nextCloudAppById.service_details.is_subscribed}
                subscriptionOldId={nextCloudAppById.id}
                drawerType={drawerActionType}
            />
        </>
    );
}