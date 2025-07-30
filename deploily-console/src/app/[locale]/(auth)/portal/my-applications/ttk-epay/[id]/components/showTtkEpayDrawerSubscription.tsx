"use client";
import { useAppDispatch } from "@/lib/hook";
import TtkEpayPaymentDrawer from "../payment-components/ttkEpayDrawerPayment";
import { closeDrawer } from "@/lib/features/my-applications/myApplicationSlice";
import { useMyApplication } from "@/lib/features/my-applications/myApplicationSelector";

export default function ShowdrawerSubscription({ isSubscribed, subscriptionOldId, drawerType }:
    { isSubscribed: any, subscriptionOldId?: any , drawerType?: any }) {
    const dispatch = useAppDispatch();
    const { openDrawer: isDrawerOpen } = useMyApplication();

    const onClose = () => {
        dispatch(closeDrawer());
    };
    

    return (
        <TtkEpayPaymentDrawer
            openDrawer={isDrawerOpen}
            onClose={onClose}
            subscriptionOldId={subscriptionOldId}
            isSubscribed={isSubscribed}
            drawerType={drawerType}
        />
    );
}
