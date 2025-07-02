"use client";

import { Button, Modal } from "antd";
import { useEffect, useState } from "react";
import { useScopedI18n } from "../../../../../../../../locales/client";
import { useServicePlan } from "@/lib/features/service-plans/servicePlanSelector";
import { ServicePlan } from "@/lib/features/service-plans/servicePlanInterface";
import ServicePlanCard from "../../../api-services/[id]/components/servicePlanCard";
import { useAppDispatch } from "@/lib/hook";
import { updateApiServiceSubscriptionStates } from "@/lib/features/api-service-subscription-states/apiServiceSubscriptionSlice";
import { fetchServicePlans } from "@/lib/features/service-plans/servicePlanThanks";
import HomeCarousel from "../../../components/homeCarousel";
import ApiServiceSubscriptionDrawer from "../../../api-services/[id]/components/apiServiceSubscriptionDrawer/apiServiceSubscriptionDrawer";

export default function UpgradeApiSubscriptionComponents({ serviceId }: { serviceId: any }) {
    const tSubscription = useScopedI18n("subscription");

    const [isModalOpen, setIsModalOpen] = useState(false);
    const { servicePlanResponse, servicePlanLoading } = useServicePlan();
    const [planSelected, setSelectedPlan] = useState(undefined);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchServicePlans(serviceId));
    }, [dispatch, serviceId]);


    const [openDrawer, setOpenDrawer] = useState(false);

    const showDrawer = (plan: any | null) => {
        if (plan !== null) {
            setSelectedPlan(plan);
            dispatch(updateApiServiceSubscriptionStates({ price: plan.price }));
        }
        setIsModalOpen(false); // ✅ Close modal
        setOpenDrawer(true);   // ✅ Open drawer
    };
      
    const onClose = () => {
        setOpenDrawer(false);
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
                title={("choose_plan")}
                open={isModalOpen}
                width="90%" 
                style={{ maxWidth: 1200, padding: 0  , justifyContent:"center"}} 
                centered
                footer={null}
            >
                {!servicePlanLoading && servicePlanResponse?.result && (
                    <HomeCarousel>
                        {servicePlanResponse.result.map((plan: ServicePlan) => (
                            <div key={plan.id} style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                margin: "0 10px" }}
                            >
                                <ServicePlanCard servicePlan={plan} showDrawer={() => showDrawer(plan)} />
                            </div>
                        ))}
                    </HomeCarousel>
                )}
            </Modal>
            {/* <ApiServiceSubscriptionDrawer
                openDrawer={openDrawer}
                onClose={onClose}
                planSelected={planSelected}
            /> */}
        </>
    );
}
