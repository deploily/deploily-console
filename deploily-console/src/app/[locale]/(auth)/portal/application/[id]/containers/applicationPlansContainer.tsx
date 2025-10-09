'use client';
import { useNewApplicationSubscription } from '@/lib/features/application/applicationServiceSelectors';
import { updateNewAppSubscriptionState } from '@/lib/features/application/applicationServiceSlice';
import { useServicePlan } from '@/lib/features/service-plans/servicePlanSelector';
import { useAppDispatch } from '@/lib/hook';
import { theme } from '@/styles/theme';
import { Button, Grid, Input, Modal } from 'antd';
import { PlanCard } from 'deploily-ui-components';
import { useI18n, useScopedI18n } from '../../../../../../../../locales/client';
import { useState } from 'react';
import { postFeedBack } from '@/lib/features/contact-us/contactUsThunks';
import Carousel from 'react-multi-carousel';
import "react-multi-carousel/lib/styles.css";

export default function ApplicationPlansContainer() {
    const screens = Grid.useBreakpoint();
    const dispatch = useAppDispatch();
    const { servicePlanResponse } = useServicePlan();
    const { app_service_plan } = useNewApplicationSubscription();

    const t = useScopedI18n("apiServiceSubscription");
    const translate = useI18n();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [comment, setComment] = useState('');

    const handleCancel = () => {
        setIsModalOpen(false);
        setComment('');
    };
    const showModal = () => setIsModalOpen(true);

    const handleContactUs = () => {
        setIsModalOpen(false);
        dispatch(postFeedBack(`${translate("interstedCustomPlan")} ${app_service_plan?.service.name} :  ${comment}`));
        setComment('');
    };

    const responsive = {
        superLargeDesktop: {
            breakpoint: { max: 3500, min: 2500 },
            items:3,
            partialVisibilityGutter: 40,
        },
        desktop: {
            breakpoint: { max: 3000, min: 1175 }, 
            items: 2, 
            partialVisibilityGutter: 30,
        },
        tablet: {
            breakpoint: { max: 900, min: 640 }, 
            items: 2,
            partialVisibilityGutter: 30,
        },
        mobile: {
            breakpoint: { max: 640, min: 0 },
            items: 1,
            partialVisibilityGutter: 30,
        },
    };

    // store the conditions only once per render
    const showDots = !screens.xxl;
    const partialVisible = !screens.xl;
    return (
        <>
            {servicePlanResponse && (
                <Carousel
                    responsive={responsive}
                    arrows={false}
                    infinite={false}
                    containerClass="plans-carousel"
                    itemClass="plans-carousel-item"
                    showDots={showDots}
                    partialVisible={partialVisible}
                >

                    {servicePlanResponse.result.map(plan => (
                        <div key={plan.id} className="plan-card-wrapper">
                            <PlanCard
                                id={plan.id}
                                price={plan.price}
                                subscription_category={
                                    plan.subscription_category === "monthly"
                                        ? t("month")
                                        : plan.subscription_category === "yearly"
                                            ? t("year")
                                            : t("month")
                                }
                                styles={{
                                    color: app_service_plan?.id === plan.id ? theme.token.orange600 : undefined,
                                }}
                                options={plan.options.map(opt => ({
                                    id: opt.id,
                                    icon: opt.icon,
                                    html_content: opt.html_content
                                }))}
                                title={plan.plan.name}
                                onClick={() => dispatch(updateNewAppSubscriptionState({ app_service_plan: plan }))}
                                isCustomPlan={plan.is_custom}
                                translations={{
                                    onDemand: translate("ondemand"),
                                    DZD: translate("DZD"),
                                    subscription_category: plan.subscription_category === "yearly"
                                        ? t("year")
                                        : t("month"),
                                    contactUs: translate("requestQuote")
                                }}
                                customPlanSelected={!!app_service_plan?.is_custom}
                                showModal={showModal}
                            />
                        </div>
                    ))}
                </Carousel>
            )}

            <Modal
                title="Contactez-nous"
                open={isModalOpen}
                onOk={handleContactUs}
                okText="Send"
                onCancel={handleCancel}
                footer={[
                    <Button
                        style={{
                            color: theme.token.colorWhite,
                            backgroundColor: theme.token.orange600,
                            border: "none",
                            paddingBlock: 20,
                            fontWeight: 600,
                            fontSize: 20,
                        }}
                        key="submit"
                        onClick={handleContactUs}
                    >
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
        </>
    );
}
