"use client";
import { useMyApplication } from "@/lib/features/my-applications/myApplicationSelector";
import { closeDrawer } from "@/lib/features/my-applications/myApplicationSlice";
import { useAppDispatch } from "@/lib/hook";
import MyAppPaymentDrawer from "./MyAppDrawerPayment";

export default function ShowdrawerSubscription({ serviceId,isSubscribed, subscriptionOldId, drawerType }:
    { serviceId: any,isSubscribed: any, subscriptionOldId?: any, drawerType?: any }) {
    const dispatch = useAppDispatch();
    const { openDrawer: isDrawerOpen } = useMyApplication();

    const onClose = () => {
        dispatch(closeDrawer());
    };


    return (
        <MyAppPaymentDrawer
            serviceId={serviceId}
            openDrawer={isDrawerOpen}
            onClose={onClose}
            subscriptionOldId={subscriptionOldId}
            isSubscribed={isSubscribed}
            drawerType={drawerType}
        />
    );
}
