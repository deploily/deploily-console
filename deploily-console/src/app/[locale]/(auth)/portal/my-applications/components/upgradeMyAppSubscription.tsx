"use client";

import { postFeedBack } from "@/lib/features/contact-us/contactUsThunks";
import { useUpgradeRenewMyApplicationDataState } from "@/lib/features/my-applications/myApplicationSelector";
import { openDrawer, updateUpgradeRenewMyAppState } from "@/lib/features/my-applications/myApplicationSlice";
import { ResourceServicePlan } from "@/lib/features/resourceServicePlans/resourceServicesPlansInterface";
import { ServicePlan } from "@/lib/features/service-plans/servicePlanInterface";
import { useServicePlan } from "@/lib/features/service-plans/servicePlanSelector";
import { fetchServicePlans } from "@/lib/features/service-plans/servicePlanThanks";
import { useAppDispatch } from "@/lib/hook";
import { theme } from "@/styles/theme";
import { Button, Card, Col, Input, Modal } from "antd";
import { PlanCard } from 'deploily-ui-components';
import { useEffect, useState } from "react";
import { useI18n, useScopedI18n } from "../../../../../../../locales/client";
import SelectVpsPlanTable from "../../application/[id]/containers/selectVpsPlanTable";
import HomeCarousel from "../../components/homeCarousel";

export default function UpgradeMyAppSubscriptionComponents(
    { serviceId, oldPrice, start_date, onClick }:
        { serviceId: any, oldPrice: number, start_date: any, onClick?: () => void }) {
    const tSubscription = useScopedI18n("subscription");
    const translate = useI18n();

    const [isContactUsModalOpen, setIsContactUsModalOpen] = useState(false);
    const [comment, setComment] = useState('');
    const handleCancel = () => {
        setIsContactUsModalOpen(false);
    };
    const showModal = () => {
        setIsPlanModalOpen(false);
        setIsContactUsModalOpen(true);
    };

    const handleContactUs = () => {
        setIsContactUsModalOpen(false);
        dispatch(postFeedBack(`${translate("interstedCustomPlan")} ${app_service_plan?.service.name} :  ${comment}`));
        setComment('');
    };


    // Modal states
    const [isPlanModalOpen, setIsPlanModalOpen] = useState(false);
    const [isVpsModalOpen, setIsVpsModalOpen] = useState(false);

    // VPS selection state
    const [selectedVpsPlan, setSelectedVpsPlan] = useState<ResourceServicePlan | null>(null);

    const { servicePlanResponse, servicePlanLoading } = useServicePlan();
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchServicePlans(serviceId));
    }, []);

    const { app_service_plan } = useUpgradeRenewMyApplicationDataState();

    const handlePlanSelection = (plan: ServicePlan) => {
        dispatch(updateUpgradeRenewMyAppState({ app_service_plan: plan }));
    };

    const handleVpsPlanSelection = (vpsPlan: ResourceServicePlan) => {
        dispatch(updateUpgradeRenewMyAppState({ resource_service_plan: vpsPlan }));

        setSelectedVpsPlan(vpsPlan);
    };

    const proceedToVpsSelection = () => {
        setIsPlanModalOpen(false);
        setIsVpsModalOpen(true);
    };

    const showDrawer = (plan: ServicePlan | any, selectedVpsPlan: ResourceServicePlan | any) => {
        dispatch(updateUpgradeRenewMyAppState({ vpsPrice: selectedVpsPlan.price, planPrice: plan.price, oldPrice: oldPrice, start_date: start_date }));
        if (onClick) onClick();

        dispatch(openDrawer({
            servicePlan: plan,
            vpsPlan: selectedVpsPlan
        }));

        setIsVpsModalOpen(false);
    };

    const handleBackToPlanSelection = () => {
        setIsVpsModalOpen(false);
        setIsPlanModalOpen(true);
    };

    return (
        <>
            <Button
                type="primary"
                style={{ backgroundColor: "#D85912", border: "none", boxShadow: "none" }}
                onClick={() => setIsPlanModalOpen(true)}
            >
                <span style={{ color: "rgba(220, 233, 245, 0.88)", fontSize: "16px", fontWeight: 600 }}>
                    {tSubscription("upgrade")}
                </span>
            </Button>

            {/* First Modal - Plan Selection */}
            <Modal
                title={tSubscription("choose_plan")}
                open={isPlanModalOpen}
                width="90%"
                style={{ maxWidth: 1200, padding: 0, justifyContent: "center" }}
                centered
                footer={null}
                onCancel={() => setIsPlanModalOpen(false)}
            >
                {!servicePlanLoading && servicePlanResponse?.result && servicePlanResponse?.result !== undefined && (
                    <HomeCarousel>
                        {servicePlanResponse.result.map((plan: ServicePlan) => {
                            return (
                                <div
                                    key={plan.id}
                                    style={{
                                        width: "100%",
                                        display: "flex",
                                        justifyContent: "center",
                                        maxWidth: 350
                                    }}
                                >
                                    <PlanCard
                                        id={plan.id}
                                        price={plan.price}
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
                                        onClick={() => handlePlanSelection(plan)}
                                        subscription_category={plan.subscription_category}
                                        translations={
                                            {
                                                onDemand: translate("ondemand"),
                                                DZD: translate("DZD"),
                                                subscription_category: plan.subscription_category === "yearly"
                                                    ? translate("year")
                                                    : translate("month"),
                                                "contactUs": translate("contactUs")
                                            }
                                        }
                                        isCustomPlan={plan.is_custom}
                                        customPlanSelected={app_service_plan != undefined && app_service_plan.is_custom}
                                        showModal={showModal}
                                    />
                                </div>
                            );
                        })}
                    </HomeCarousel>
                )}

                <Col style={{ display: "flex", justifyContent: "end", padding: "1rem" }}>
                    <Button
                        type="primary"
                        style={{ backgroundColor: "#D85912", border: "none", boxShadow: "none" }}
                        disabled={!app_service_plan || app_service_plan.is_custom}
                        onClick={proceedToVpsSelection}
                    >
                        <span style={{ color: "rgba(220, 233, 245, 0.88)", fontSize: "16px", fontWeight: 600 }}>
                            {tSubscription('next')}
                        </span>
                    </Button>
                </Col>
            </Modal>

            {/* Second Modal - VPS Selection */}
            <Modal
                title={tSubscription("select_vps_plan")}
                open={isVpsModalOpen}
                width="90%"
                style={{ maxWidth: 1200, padding: 0, justifyContent: "center" }}
                centered
                footer={null}
                onCancel={() => setIsVpsModalOpen(false)}
            >
                <Card styles={{ body: { padding: 0 } }}>
                    <SelectVpsPlanTable
                        onVpsPlanSelect={handleVpsPlanSelection}
                        selectedVpsPlan={selectedVpsPlan}
                    />
                </Card>

                <Col style={{ display: "flex", justifyContent: "space-between", padding: "1rem" }}>
                    <Button
                        onClick={handleBackToPlanSelection}
                        style={{
                            fontWeight: 500,
                            color: "#D85912",
                            borderColor: "#D85912",
                            backgroundColor: "transparent",
                        }}
                    >
                        {tSubscription('back')}
                    </Button>
                    <Button
                        type="primary"
                        style={{ backgroundColor: "#D85912", border: "none", boxShadow: "none" }}
                        disabled={!selectedVpsPlan} // Disable if no VPS plan is selected
                        onClick={() => {
                            if (app_service_plan && selectedVpsPlan) {
                                showDrawer(app_service_plan, selectedVpsPlan);
                            } else {
                                console.warn("No app_service_plan or VPS plan selected yet");
                            }
                        }}
                    >
                        <span style={{ color: "rgba(220, 233, 245, 0.88)", fontSize: "16px", fontWeight: 600 }}>
                            {tSubscription("upgrade")}
                        </span>
                    </Button>
                </Col>
            </Modal>
            <Modal
                title="Contactez-nous"
                open={isContactUsModalOpen}
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
        </>
    );
}