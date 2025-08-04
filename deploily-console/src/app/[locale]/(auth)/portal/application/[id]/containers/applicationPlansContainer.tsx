'use client';
import { useNewApplicationSubscription } from '@/lib/features/application/applicationServiceSelectors';
import { updateNewAppSubscriptionState } from '@/lib/features/application/applicationServiceSlice';
import { useServicePlan } from '@/lib/features/service-plans/servicePlanSelector';
import { useAppDispatch } from '@/lib/hook';
import { theme } from '@/styles/theme';
import { Button, Col, Input, Modal, Row } from 'antd';
import { PlanCard } from 'deploily-ui-components';
import { useI18n, useScopedI18n } from '../../../../../../../../locales/client';
import { useState } from 'react';
import { postFeedBack } from '@/lib/features/contact-us/contactUsThunks';

export default function ApplicationPlansContainer() {
    const dispatch = useAppDispatch();
    const { servicePlanResponse } = useServicePlan()
    const { app_service_plan } = useNewApplicationSubscription()


    const t = useScopedI18n("apiServiceSubscription");
    const translate = useI18n();
    
        const [isModalOpen, setIsModalOpen] = useState(false);
        const [comment, setComment] = useState('');
        const handleCancel = () => {
            setIsModalOpen(false);
            setComment('');
        };
        const showModal = () => {
            setIsModalOpen(true);
        };

        const handleContactUs = () => {
                setIsModalOpen(false);
            dispatch(postFeedBack(`${translate("interstedCustomPlan")} ${app_service_plan?.service.name} :  ${comment}`));
                setComment('');
        };

    return (
        <Row gutter={[16, 24]} justify="start">
            {servicePlanResponse !== undefined &&
                servicePlanResponse.result.map(plan => {
                    return <Col xs={24} sm={24} md={12} lg={12} xl={10} xxl={8}
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            padding: "0.5rem",
                        }}
                        span={Math.floor(24 / servicePlanResponse.result.length)}
                        key={plan.id.toString()}
                    // style={{ maxWidth: '280px' }}
                    >
                        <div style={{ width: "100%", display: "flex", justifyContent: "center", maxWidth: 350, }}>

                            <PlanCard
                                id={plan.id}
                                price={plan.price}
                                subscription_category={plan.subscription_category === "monthly"
                                    ? t("month")
                                    : plan.subscription_category === "yearly"
                                        ? t("year")
                                        : t("month")}
                                styles={{
                                    color: app_service_plan != undefined && app_service_plan.id == plan.id ? theme.token.orange600 : undefined,
                                }}
                                options={
                                    plan.options.map(opt => ({
                                        id: opt.id,
                                        icon: opt.icon,
                                        html_content: opt.html_content
                                    }))
                                }
                                title={plan.plan.name}
                                onClick={() => dispatch(updateNewAppSubscriptionState({ app_service_plan: plan }))}
                                isCustomPlan={plan.is_custom}
                                translations={
                                    {
                                        onDemand:translate("ondemand"),
                                        DZD: translate("DZD"),
                                        subscription_category: plan.subscription_category === "yearly"
                                            ? t("year")
                                            : t("month"),
                                        "contactUs": translate("contactUs")
                                    }
                                }
                                customPlanSelected={app_service_plan != undefined && app_service_plan.is_custom}
                                showModal={showModal}
                            />
                        </div>

                        <Modal
                            title="Contactez-nous"
                            open={isModalOpen}
                            onOk={handleContactUs}
                            okText="Send"
                            onCancel={handleCancel}
                            footer={[
                                <Button style={{
                                    color: theme.token.colorWhite,
                                    backgroundColor: theme.token.orange600,
                                    border: "none",
                                    paddingBlock: 20,
                                    fontWeight: 600,
                                    fontSize: 20,
                                }} key="submit" onClick={handleContactUs}>
                                    {translate("send")}
                                </Button>,
                            ]}
                        >
                            <Input.TextArea
                                rows={4}
                                placeholder={translate("whriteMessage")}
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                            />
                        </Modal>
                    </Col>
                }
                )
            }

        </Row>
    );
}
