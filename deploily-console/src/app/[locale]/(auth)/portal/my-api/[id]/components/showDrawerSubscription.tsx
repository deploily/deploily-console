"use client";
import { useAppDispatch } from "@/lib/hook";
import ApiServiceSubscriptionDrawer from "../../../api-services/[id]/components/apiServiceSubscriptionDrawer/apiServiceSubscriptionDrawer";
import { useApiServiceSubscriptionStates } from "@/lib/features/api-service-subscription-states/apiServiceSubscriptionSelectors";
import { closeDrawer } from "@/lib/features/api-service-subscription-states/apiServiceSubscriptionSlice";

export default function ShowdrawerSubscription({ IsSubscribed, subscriptionOldId, drawerType }: { IsSubscribed?: boolean, subscriptionOldId?: number, drawerType?: any }) {
    const dispatch = useAppDispatch();
    const { openDrawer: isDrawerOpen, selectedPlan } = useApiServiceSubscriptionStates();

    return (
        <ApiServiceSubscriptionDrawer
            openDrawer={isDrawerOpen}
            onClose={() => dispatch(closeDrawer())}
            planSelected={selectedPlan}
            IsSubscribed={IsSubscribed} 
            subscriptionOldId={subscriptionOldId}
            drawerType={drawerType}
        />
    );
}
