"use client";

import { openDrawer, updateUpgradeRenewMyAppState } from "@/lib/features/my-applications/myApplicationSlice";
import { useServicePlansByType } from "@/lib/features/resourceServicePlans/resourceServicesPlansSelectors";
import { fetchResourceServicesPlans } from "@/lib/features/resourceServicePlans/resourceServicesPlansThunk";
import { useServicePlan } from "@/lib/features/service-plans/servicePlanSelector";
import { fetchServicePlans } from "@/lib/features/service-plans/servicePlanThanks";
import { useAppDispatch } from "@/lib/hook";
import { Button } from "antd";
import { useEffect } from "react";
import { useScopedI18n } from "../../../../../../../locales/client";

interface RenewTtkEpaySubscriptionProps {
    serviceId: any;
    oldPrice: any;
    start_date: any;
    plan: any;
    selectedVpsPlan: any;
    duration?: any;
    onClick?: () => void;
}

export default function RenewMyAppSubscriptionComponents({
    serviceId,
    oldPrice,
    start_date,
    plan,
    selectedVpsPlan, duration,
    onClick
}: RenewTtkEpaySubscriptionProps) {
    const tSubscription = useScopedI18n("subscription");
    const dispatch = useAppDispatch();

    const { servicePlansList } = useServicePlansByType();

    const { servicePlanResponse } = useServicePlan();

    useEffect(() => {
        dispatch(fetchServicePlans(serviceId));
        dispatch(fetchResourceServicesPlans(serviceId));
    }, []);

    const showDrawer = () => {

        const allPlans = servicePlanResponse?.result.flat();
        const matchedPlan = allPlans?.find(
            (p) => (p.id) === (plan)
        );

        const allVpsPlans = servicePlansList?.result.flat();

        const matchedVpsPlan = allVpsPlans?.find(
            (v) => v.id === (selectedVpsPlan)
        );     
        dispatch(

            updateUpgradeRenewMyAppState({
                oldAppServicePrice: oldPrice,
                oldAppServiceStartDate: start_date,
                oldAppServiceDuration: duration,
                app_service_plan: matchedPlan,
                managed_ressource_details: matchedVpsPlan,
            })


        );
        if (onClick) onClick();
            

        dispatch(
            openDrawer({
                servicePlan: matchedPlan,
                vpsPlan: matchedVpsPlan,
            })
        );
    }



    return (
        <Button
            type="primary"
            onClick={() => showDrawer()}
            style={{
                backgroundColor: "#D85912",
                border: "none",
                boxShadow: "none",
            }}
        >
            <span
                style={{
                    color: "rgba(220, 233, 245, 0.88)",
                    fontSize: "16px",
                    fontWeight: 600,
                }}
            >
                {tSubscription("renew")}
            </span>
        </Button>
    );
}
