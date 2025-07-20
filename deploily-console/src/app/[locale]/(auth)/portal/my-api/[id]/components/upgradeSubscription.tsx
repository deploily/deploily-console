"use client";

import { openDrawer, upgradeApiServiceSubscriptionStates } from "@/lib/features/api-service-subscription-states/apiServiceSubscriptionSlice";
import { ServicePlan } from "@/lib/features/service-plans/servicePlanInterface";
import { useServicePlan } from "@/lib/features/service-plans/servicePlanSelector";
import { fetchServicePlans } from "@/lib/features/service-plans/servicePlanThanks";
import { useAppDispatch } from "@/lib/hook";
import { Button, Modal } from "antd";
import { useEffect, useState } from "react";
import { useScopedI18n } from "../../../../../../../../locales/client";
import ServicePlanCard from "../../../api-services/[id]/components/servicePlanCard";
import HomeCarousel from "../../../components/homeCarousel";

export default function UpgradeApiSubscriptionComponents({ serviceId, planSelectedId, oldPrice, start_date, onClick }:
    { start_date: any, serviceId: any, planSelectedId: any, oldPrice: any, onClick?: () => void }) {
    const tSubscription = useScopedI18n("subscription");

    const [isModalOpen, setIsModalOpen] = useState(false);
    const { servicePlanResponse, servicePlanLoading } = useServicePlan();
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchServicePlans(serviceId));
    }, []);

    const showDrawer = (plan: any | null) => {
        if (plan !== null) {
            dispatch(upgradeApiServiceSubscriptionStates({ price: plan.price, oldPrice: oldPrice, start_date: start_date })); //TODO UPDATE PRICE
            dispatch(openDrawer(plan));
            if (onClick) onClick();
        }
        setIsModalOpen(false);
    };
    return (
        <>
            <Button
                type="primary"
                style={{ backgroundColor: "#D85912", border: "none", boxShadow: "none" }}
                onClick={() => setIsModalOpen(true)}
            >
                <span style={{ color: "rgba(220, 233, 245, 0.88)", fontSize: "16px", fontWeight: 600 }}>
                    {tSubscription("upgrade")}
                </span>
            </Button>

            <Modal
                title={tSubscription("choose_plan")}
                open={isModalOpen}
                width="90%"
                style={{ maxWidth: 1200, padding: 0, justifyContent: "center" }}
                centered
                footer={null}
                onCancel={() => setIsModalOpen(false)}
            >
                {!servicePlanLoading && servicePlanResponse?.result && (
                    <HomeCarousel>
                        {servicePlanResponse.result.map((plan: ServicePlan) => {

                            return (
                                <div key={plan.id} style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    margin: "0 10px"
                                }}>
                                    <ServicePlanCard
                                        servicePlan={plan}
                                        showDrawer={() => showDrawer(plan)}
                                        planSelectedId={plan.id === planSelectedId}
                                    />
                                </div>
                            );

                        })}
                    </HomeCarousel>
                )}
            </Modal>

        </>
    );
}
