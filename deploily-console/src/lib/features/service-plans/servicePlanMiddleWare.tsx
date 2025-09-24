
import { Action, Dispatch, MiddlewareAPI, ThunkDispatch } from "@reduxjs/toolkit";
import { updateNewAppSubscriptionState } from "../application/applicationServiceSlice";
import { updateNewDeploymentSubscriptionState } from "../deployment-service/deploymentServiceSlice";
import { updateUpgradeRenewMyAppState } from "../my-applications/myApplicationSlice";

const servicesPlansMiddleware = (store: MiddlewareAPI<ThunkDispatch<any, any, Action>, any>) => {
    return (next: Dispatch<any>) => async (action: any) => {
        switch (action.type) {
            case 'servicePlan/getServicePlans/fulfilled':
                if (action.payload !== undefined && action.payload.result.length > 0) {
                    const selectedPlan = action.payload.result[0];
                    console.log("Selected plan from middleware", selectedPlan);

                    store.dispatch(updateNewAppSubscriptionState({ "app_service_plan": selectedPlan }));
                    store.dispatch(updateUpgradeRenewMyAppState({ "app_service_plan": selectedPlan }));
                    store.dispatch(updateNewDeploymentSubscriptionState({ "deployment_service_plan": selectedPlan }));
                    //TODO add of upgrade & renew
                }
                break;
            default:
                break;
        }
        return next(action);
    }
};

export default servicesPlansMiddleware
