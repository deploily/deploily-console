
import { Action, Dispatch, MiddlewareAPI, ThunkDispatch } from "@reduxjs/toolkit";
import { updateNewAppSubscriptionState } from "../application/applicationServiceSlice";
import { updateNewDeploymentSubscriptionState } from "../deployment-service/deploymentServiceSlice";
import { updateUpgradeRenewMyAppState } from "../my-applications/myApplicationSlice";

const paymentProfileMiddleware = (store: MiddlewareAPI<ThunkDispatch<any, any, Action>, any>) => {
    return (next: Dispatch<any>) => async (action: any) => {

        switch (action.type) {
            case 'paymentProfile/getNotDefaultPaymentProfiles/fulfilled':
                if (action.payload !== undefined && action.payload.result.length > 0) {
                    store.dispatch(updateNewAppSubscriptionState({ "selectedProfile": action.payload.result[0] ?? undefined }));
                    store.dispatch(updateUpgradeRenewMyAppState({ "selectedProfile": action.payload.result[0] ?? undefined }));
                    store.dispatch(updateNewDeploymentSubscriptionState({ "selectedProfile": action.payload.result[0] ?? undefined }));
                    //TODO add of upgrade & renew
                }
                break;
            default:
                break;
        }
        return next(action);
    }
};

export default paymentProfileMiddleware
