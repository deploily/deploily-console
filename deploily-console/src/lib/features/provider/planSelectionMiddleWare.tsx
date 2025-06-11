
import { Action, Dispatch, MiddlewareAPI, ThunkDispatch } from "@reduxjs/toolkit";
import { fetchCloudResourcesByProviderId, fetchPlansByResourceId } from "./providerThunk";
import { updateSelectedValues } from "./providerSlice";

const providersMiddleware = (store: MiddlewareAPI<ThunkDispatch<any, any, Action>, any>) => {
    return (next: Dispatch<any>) => async (action: any) => {
        //TODO  : RETEST THIS MIDDLEWARE
        // This middleware listens for specific actions related to providers and updates the state accordingly.
        // It fetches cloud resources and plans based on the selected provider, resource, and plan IDs.
        switch (action.type) {

            case 'provider/getProvidersList/fulfilled':
                console.log('Fetching provider fulfilled');
                if (action.payload !== undefined && action.payload.ids.length > 0) {
                    store.dispatch(fetchCloudResourcesByProviderId(action.payload.ids[0]));
                    store.dispatch(updateSelectedValues({"providerId":action.payload.ids[0]}));
                }
            break;

            case 'provider/getCloudResourcesByProviderId/fulfilled':
                console.log('Fetching resource fulfilled', action.payload);
                if (action.payload !== undefined && action.payload.ids.length > 0) {
                    store.dispatch(updateSelectedValues({ "resourceId": action.payload.ids[0] }));

                }
            break;

            case 'provider/getPlansByResourceId/fulfilled':
                console.log('Fetching plans fulfilled', action.payload);
                if (action.payload !== undefined && action.payload.ids.length > 0) {
                    store.dispatch(updateSelectedValues({ "planId": action.payload.ids[0] }));
                }
            break;
            case 'providerState/updateSelectedValues':
                if(action.payload.providerId !== undefined) {
                    store.dispatch(fetchCloudResourcesByProviderId(action.payload.providerId));
                }
                if(action.payload.resourceId !== undefined) {
                    store.dispatch(fetchPlansByResourceId(action.payload.resourceId));
                }
                if(action.payload.planId !== undefined) {
                    // You can handle plan selection logic here if needed
                }
               
            break;

            default:
                break;
        }
        return next(action);
    }
};

export default providersMiddleware
