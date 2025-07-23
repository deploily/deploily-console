"use client";

import {
    openDrawer,
    upgradeApiServiceSubscriptionStates,
} from "@/lib/features/api-service-subscription-states/apiServiceSubscriptionSlice";
import { useServicePlan } from "@/lib/features/service-plans/servicePlanSelector";
import { fetchServicePlans } from "@/lib/features/service-plans/servicePlanThanks";
import { useAppDispatch } from "@/lib/hook";
import { Button } from "antd";
import { useEffect } from "react";
import { useScopedI18n } from "../../../../../../../../locales/client";

interface Props {
    serviceId: any;
    plan: any;
    oldPrice: any;
    start_date: any;
    onClick?: () => void;
}

export default function RenewApiSubscriptionComponents({
    serviceId,
    plan,
    oldPrice,
    start_date, onClick }: Props) {
    const tSubscription = useScopedI18n("subscription");
    const { servicePlanResponse } = useServicePlan();
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchServicePlans(serviceId));
    }, []);

    const showDrawer = () => {

        const allPlans = servicePlanResponse?.result.flat();

        const matchedPlan = allPlans?.find(
            (p) => (p.id) === (plan)
        );

        dispatch(
            upgradeApiServiceSubscriptionStates({
                selectedPlan: matchedPlan,
                price: matchedPlan?.price,
                oldPrice,
                start_date,
            })
        );

        dispatch(openDrawer(matchedPlan));
        if (onClick) onClick();

    };


    return (
        <Button
            type="primary"
            onClick={showDrawer}
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
