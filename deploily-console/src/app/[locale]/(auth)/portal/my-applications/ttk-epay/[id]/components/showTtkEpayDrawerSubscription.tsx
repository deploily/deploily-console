"use client";
import { useTtkEpay } from "@/lib/features/ttk-epay/ttkEpaySelector";
import { useAppDispatch } from "@/lib/hook";
import TtkEpayPaymentDrawer from "../payment-components/ttkEpayDrawerPayment";
import { closeDrawer } from "@/lib/features/ttk-epay/ttkEpaySlice";

export default function ShowdrawerSubscription({ isSubscribed, subscriptionOldId, drawerType }:
    { isSubscribed: any, subscriptionOldId?: any , drawerType?: any }) {
    const dispatch = useAppDispatch();
    const { openDrawer: isDrawerOpen } = useTtkEpay();

    const onClose = () => {
        dispatch(closeDrawer());
    };
    console.log("Drawer Type:::::::::::::::::::", drawerType);
    

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
