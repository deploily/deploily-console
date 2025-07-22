"use client";

import { ResourceServicePlan } from "@/lib/features/resourceServicePlans/resourceServicesPlansInterface";
import { ServicePlan } from "@/lib/features/service-plans/servicePlanInterface";
import { useServicePlan } from "@/lib/features/service-plans/servicePlanSelector";
import { fetchServicePlans } from "@/lib/features/service-plans/servicePlanThanks";
import { useUpgradeTtkEpaySubscriptionState } from "@/lib/features/ttk-epay/ttkEpaySelector";
import { openDrawer, upgradeAppSubscriptionState } from "@/lib/features/ttk-epay/ttkEpaySlice";
import { useAppDispatch } from "@/lib/hook";
import { theme } from "@/styles/theme";
import { Button, Card, Col, Modal } from "antd";
import { PlanCard } from 'deploily-ui-components';
import { useEffect, useState } from "react";
import { useScopedI18n } from "../../../../../../../../../locales/client";
import SelectVpsPlanTable from "../../../../application/[id]/containers/selectVpsPlanTable";
import HomeCarousel from "../../../../components/homeCarousel";



export default function UpgradeTtkEpaySubscriptionComponents(
    { serviceId, oldPrice, start_date, onClick }:
        { serviceId: any, oldPrice: number, start_date: any, onClick?: () => void }) {
    const tSubscription = useScopedI18n("subscription");

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

    const { app_service_plan } = useUpgradeTtkEpaySubscriptionState();

    const handlePlanSelection = (plan: ServicePlan) => {
        dispatch(upgradeAppSubscriptionState({ app_service_plan: plan }));
    };

    const handleVpsPlanSelection = (vpsPlan: ResourceServicePlan) => {
        dispatch(upgradeAppSubscriptionState({ resource_service_plan: vpsPlan }));

        setSelectedVpsPlan(vpsPlan);
    };

    const proceedToVpsSelection = () => {
        setIsPlanModalOpen(false);
        setIsVpsModalOpen(true);
    };

    const showDrawer = (plan: ServicePlan | any, selectedVpsPlan: ResourceServicePlan | any) => {
        dispatch(upgradeAppSubscriptionState({ vpsPrice: selectedVpsPlan.price, planPrice: plan.price, oldPrice: oldPrice, start_date: start_date }));
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
                {!servicePlanLoading && servicePlanResponse?.result && (
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
                        disabled={!app_service_plan}
                        onClick={proceedToVpsSelection}
                    >
                        <span style={{ color: "rgba(220, 233, 245, 0.88)", fontSize: "16px", fontWeight: 600 }}>
                            Next
                        </span>
                    </Button>
                </Col>
            </Modal>

            {/* Second Modal - VPS Selection */}
            <Modal
                title={("select_vps_plan")}
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
                    >
                        Back
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
        </>
    );
}