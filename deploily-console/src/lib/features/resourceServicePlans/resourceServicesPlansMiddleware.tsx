
import { Action, Dispatch, MiddlewareAPI, ThunkDispatch } from "@reduxjs/toolkit";
import { updateNewAppSubscriptionState } from "../application/applicationServiceSlice";

const resourceServicesPlansMiddleware = (store: MiddlewareAPI<ThunkDispatch<any, any, Action>, any>) => {
    return (next: Dispatch<any>) => async (action: any) => {
        switch (action.type) {
            case 'resourceServicesPlansSlice/updateSelectedPlan':
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
