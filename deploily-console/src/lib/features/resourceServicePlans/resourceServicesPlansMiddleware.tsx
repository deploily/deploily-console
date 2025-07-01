
import { Action, Dispatch, MiddlewareAPI, ThunkDispatch } from "@reduxjs/toolkit";
import { updateNewAppSubscriptionState } from "../application/applicationServiceSlice";

const resourceServicesPlansMiddleware = (store: MiddlewareAPI<ThunkDispatch<any, any, Action>, any>) => {
    return (next: Dispatch<any>) => async (action: any) => {
        switch (action.type) {
            case 'resourceServicesPlansSlice/updateSelectedPlan':
                if (action.payload !== undefined) {
                    store.dispatch(updateNewAppSubscriptionState({ "resource_service_plan": action.payload }));
                }
                break;
            case 'ressourcePlans/getResourceServicesPlans/fulfilled':
                
                console.log("######################");
                console.log(action.payload.result);

                if (action.payload !== undefined && action.payload.result.length > 0) {
                    store.dispatch(updateNewAppSubscriptionState({ "resource_service_plan": action.payload.result[0] }));
                }
                break;
            default:
                break;
        }
        return next(action);
    }
};

export default resourceServicesPlansMiddleware
