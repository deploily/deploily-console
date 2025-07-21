"use client";

import { Button } from "antd";
import { useScopedI18n } from "../../../../../../../../../locales/client";
import { ServicePlan } from "@/lib/features/service-plans/servicePlanInterface";
import { ResourceServicePlan } from "@/lib/features/resourceServicePlans/resourceServicesPlansInterface";
import { useAppDispatch } from "@/lib/hook";
import { openDrawer, upgradeAppSubscriptionState } from "@/lib/features/ttk-epay/ttkEpaySlice";
import { useServicePlan } from "@/lib/features/service-plans/servicePlanSelector";
import { useEffect, useState } from "react";
import { useSelectedPlan, useServicePlansByType } from "@/lib/features/resourceServicePlans/resourceServicesPlansSelectors";
import { fetchServicePlans } from "@/lib/features/service-plans/servicePlanThanks";
import { fetchResourceServicesPlans } from "@/lib/features/resourceServicePlans/resourceServicesPlansThunk";

interface RenewTtkEpaySubscriptionProps {
    serviceId: any;
    oldPrice: any;
    start_date: any;
    plan: any;
    selectedVpsPlan: any;
    onClick?: () => void;
}

export default function RenewTtkEpaySubscriptionComponents({
    serviceId,
    oldPrice,
    start_date,
    plan,
    selectedVpsPlan,
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
            upgradeAppSubscriptionState(
                {
                    vpsPrice: selectedVpsPlan.price,
                    planPrice: plan.price,
                    oldPrice: oldPrice,
                    start_date: start_date
                }));
        if (onClick) onClick();

        dispatch(
            openDrawer({
                servicePlan: matchedPlan,
                vpsPlan: matchedVpsPlan,
            })
        );
    };

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
