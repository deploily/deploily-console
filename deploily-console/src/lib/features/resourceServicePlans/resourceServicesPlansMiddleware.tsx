
import { Action, Dispatch, MiddlewareAPI, ThunkDispatch } from "@reduxjs/toolkit";
import { updateNewAppSubscriptionState } from "../application/applicationServiceSlice";

const resourceServicesPlansMiddleware = (store: MiddlewareAPI<ThunkDispatch<any, any, Action>, any>) => {
    return (next: Dispatch<any>) => async (action: any) => {
        //TODO  : RETEST THIS MIDDLEWARE
        // This middleware listens for specific actions related to providers and updates the state accordingly.
        // It fetches cloud resources and plans based on the selected provider, resource, and plan IDs.
        switch (action.type) {
            case 'ResourceServicesPlansState/updateSelectedPlan/fulfilled':
                if (action.payload !== undefined) {
                    console.log(action.payload);
                    store.dispatch(updateNewAppSubscriptionState({ "resource_service_plan": action.payload }));
                }
                break;
            default:
                break;
        }
        return next(action);
    }
};

export default resourceServicesPlansMiddleware
