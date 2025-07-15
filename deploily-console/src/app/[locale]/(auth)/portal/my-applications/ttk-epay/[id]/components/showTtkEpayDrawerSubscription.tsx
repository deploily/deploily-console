"use client";
import { closeDrawer } from "@/lib/features/api-service-subscription-states/apiServiceSubscriptionSlice";
import { useTtkEpay } from "@/lib/features/ttk-epay/ttkEpaySelector";
import { useAppDispatch } from "@/lib/hook";
import { useEffect } from "react";
import TtkEpayPaymentDrawer from "../payment-components/ttkEpayDrawerPayment";

export default function ShowdrawerSubscription({ IsSubscribed, subscriptionOldId }: { IsSubscribed: boolean, subscriptionOldId?: any }) {
    const dispatch = useAppDispatch();
    const { openDrawer: isDrawerOpen, servicePlan, vpsPlan } = useTtkEpay();

    const onClose = () => {
        dispatch(closeDrawer());
    };

    useEffect(() => {
        console.log("[Drawer Sub] Mount with drawer state:", isDrawerOpen);
    }, []);

    useEffect(() => {
        console.log("[Drawer Sub] Drawer state updated:", isDrawerOpen, servicePlan, vpsPlan);
    }, [isDrawerOpen, servicePlan]);

    return (
        <TtkEpayPaymentDrawer
            openDrawer={isDrawerOpen}
            onClose={onClose}
            subscriptionOldId={subscriptionOldId}
        />
    );
}
