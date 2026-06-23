import { Action, Dispatch, MiddlewareAPI, ThunkDispatch } from "@reduxjs/toolkit";
import { updateNewAppSubscriptionState } from "../application/applicationServiceSlice";
import { updateNewDeploymentSubscriptionState } from "../deployment/deploymentServiceSlice";

const resourceServicesPlansMiddleware = (
  store: MiddlewareAPI<ThunkDispatch<any, any, Action>, any>,
) => {
  return (next: Dispatch<any>) => async (action: any) => {
    switch (action.type) {
      case "resourceServicesPlansSlice/updateSelectedPlan":
        if (action.payload !== undefined) {
          store.dispatch(
            updateNewAppSubscriptionState({ managed_ressource_details: action.payload }),
          );
          store.dispatch(
            updateNewDeploymentSubscriptionState({ managed_ressource_details: action.payload }),
          );
        }
        break;
      case "ressourcePlans/getResourceServicesPlans/fulfilled":
        if (action.payload !== undefined && action.payload.result.length > 0) {
        }
        break;
      default:
        break;
    }
    return next(action);
  };
};

export default resourceServicesPlansMiddleware;
