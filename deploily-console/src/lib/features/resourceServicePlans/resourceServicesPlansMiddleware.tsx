
import { Action, Dispatch, MiddlewareAPI, ThunkDispatch } from "@reduxjs/toolkit";
import { updateNewAppSubscriptionState } from "../application/applicationServiceSlice";
import { updateUpgradeRenewMyAppState } from "../my-applications/myApplicationSlice";

const resourceServicesPlansMiddleware = (store: MiddlewareAPI<ThunkDispatch<any, any, Action>, any>) => {
    return (next: Dispatch<any>) => async (action: any) => {
        switch (action.type) {
            case 'resourceServicesPlansSlice/updateSelectedPlan':
                if (action.payload !== undefined) {
                    store.dispatch(updateNewAppSubscriptionState({ "managed_ressource_details": action.payload }));
                    store.dispatch(updateUpgradeRenewMyAppState({ "managed_ressource_details": action.payload }));
                }
                break;
            case 'ressourcePlans/getResourceServicesPlans/fulfilled':

                if (action.payload !== undefined && action.payload.result.length > 0) {
                    store.dispatch(updateNewAppSubscriptionState({ "managed_ressource_details": action.payload.result[0] }));
                    store.dispatch(updateUpgradeRenewMyAppState({ "managed_ressource_details": action.payload.result[0] }));
                }
                break;
            default:
                break;
        }
        return next(action);
    }
};

export default resourceServicesPlansMiddleware
