import { calculateRemainingSubscriptionValue } from "@/lib/utils/subscriptionUtils";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MyApplicationByIdState, MyApplicationState, RenewMyApplicationState, UpgradeMyApplicationInterface, UpgradeMyApplicationState } from "./myApplicationInterface";
import { fetchMyApplicationById, fetchMyApplications, renewMyApplication, upgradeMyApplication } from "./myApplicationThunks";

interface ApplicationServiceState {
  myApplications: MyApplicationState;
  myApplicationById: MyApplicationByIdState;
  upgradeMyApplicationState: UpgradeMyApplicationState;
  renewMyApplicationState: RenewMyApplicationState;
  upgradeRenewMyApplicationData: UpgradeMyApplicationInterface;
  openDrawer: boolean;
  servicePlan: any;
  vpsPlan: any;
}

const initialState: ApplicationServiceState = {
  myApplications: {
    MyApplicationList: undefined,
    isLoading: false,
    loadingError: null,
  },
  myApplicationById: {
    myApplicationsById: undefined,
    isLoading: false,
    loadingError: null,
  },
  upgradeMyApplicationState: {
    upgradeMyApplication: undefined,
    isLoadingUpgrade: false,
    loadingError: null,
  },
  renewMyApplicationState: {
    renewMyApplication: undefined,
    isLoadingRenew: false,
    loadingError: null,
  },
  upgradeRenewMyApplicationData: {
    duration: 3,
    price: 0,
    managed_ressource_details: undefined,
    app_service_plan: undefined,
    totalamount: 0,
    selectedProfile: undefined,
    isBalanceSufficient: null,
    selected_version: undefined,
    promoCode: "",
    promoCodeRate: undefined,
    promoColor: undefined,
    oldAppServicePrice: undefined,
    oldAppServiceStartDate: undefined,
    oldAppServiceDuration: undefined,
  },
  openDrawer: false,
  servicePlan: null,
  vpsPlan: null,
};
const ApplicationServiceSlice = createSlice({
  name: "myApplicationService",
  initialState,
  reducers: {
    updateUpgradeRenewMyAppState: (state, action: PayloadAction<any>) => {
      let updatedState: UpgradeMyApplicationInterface = {
        ...state.upgradeRenewMyApplicationData,
        ...action.payload
      };      
      let updatedAmount = 0;
      if (updatedState.app_service_plan !== undefined) {
        updatedAmount = updatedState.duration * updatedState.app_service_plan.price;

        if (updatedState.managed_ressource_details !== undefined) {
          updatedAmount += updatedState.duration * updatedState.managed_ressource_details.price;
        }
      }

      // 2. Subtract remaining value from old app subscription if available
      if (
        updatedState.oldAppServicePrice !== undefined &&
        updatedState.oldAppServiceStartDate !== undefined &&
        updatedState.oldAppServiceDuration !== undefined
      ) {
        const oldAppRemaining = calculateRemainingSubscriptionValue({
          price: updatedState.oldAppServicePrice,
          start_date: updatedState.oldAppServiceStartDate,
          duration_month: updatedState.oldAppServiceDuration,
        });

        updatedAmount = updatedAmount - oldAppRemaining;
      }
      // 3. Apply promo discount if exists

      if (updatedState.promoCodeRate != undefined) {
        updatedState = { ...updatedState, promoColor: "green" }
        updatedAmount = updatedAmount - ((updatedAmount * (updatedState.promoCodeRate || 0)) / 100);
      }
      updatedState = { ...updatedState, totalamount: updatedAmount }
      if (updatedState?.selectedProfile != undefined) {
        if ((updatedState?.selectedProfile.balance - updatedState.totalamount) >= 0) {
          updatedState.isBalanceSufficient = true;
        } else {
          updatedState.isBalanceSufficient = false;
        }
      }
      // 4. Ensure amount isn't negative
      updatedAmount = Math.round(updatedAmount);
      updatedState.totalamount = updatedAmount;
      state.upgradeRenewMyApplicationData = updatedState;
      return state;
    },
    openDrawer: (state, action) => {
      state.openDrawer = true;
      state.servicePlan = action.payload.servicePlan;
      state.vpsPlan = action.payload.vpsPlan;
    },
    closeDrawer: (state) => {
      state.openDrawer = false;
      state.servicePlan = null;
      state.vpsPlan = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMyApplications.pending, (state) => {
        state.myApplications.isLoading = true;
      })
      .addCase(fetchMyApplications.fulfilled, (state, action) => {
        state.myApplications.isLoading = false;
        state.myApplications.loadingError = null;
        state.myApplications.MyApplicationList = action.payload.result;
      })
      .addCase(fetchMyApplications.rejected, (state, { payload }) => {
        state.myApplications.isLoading = false;
        state.myApplications.loadingError = payload;
      })

      .addCase(fetchMyApplicationById.pending, (state) => {
        state.myApplicationById.isLoading = true;
      })
      .addCase(fetchMyApplicationById.fulfilled, (state, action) => {
        state.myApplicationById.isLoading = false;
        state.myApplicationById.loadingError = null;
        state.myApplicationById.myApplicationsById = action.payload.result;
      })
      .addCase(fetchMyApplicationById.rejected, (state, { payload }) => {
        state.myApplicationById.isLoading = false;
        state.myApplicationById.loadingError = payload;
      })
      .addCase(upgradeMyApplication.pending, (state) => {
        state.upgradeMyApplicationState.isLoadingUpgrade = true;
      })
      .addCase(upgradeMyApplication.fulfilled, (state, action) => {
        state.upgradeMyApplicationState.isLoadingUpgrade = false;
        state.upgradeMyApplicationState.loadingError = null;
        state.upgradeMyApplicationState.upgradeMyApplication = action.payload;
      })
      .addCase(upgradeMyApplication.rejected, (state, { payload }) => {
        state.upgradeMyApplicationState.isLoadingUpgrade = false;
        state.upgradeMyApplicationState.loadingError = payload;
      })
      .addCase(renewMyApplication.pending, (state) => {
        state.renewMyApplicationState.isLoadingRenew = true;
      })
      .addCase(renewMyApplication.fulfilled, (state, action) => {
        state.renewMyApplicationState.isLoadingRenew = false;
        state.renewMyApplicationState.loadingError = null;
        state.renewMyApplicationState.renewMyApplication = action.payload;
      })
      .addCase(renewMyApplication.rejected, (state, { payload }) => {
        state.renewMyApplicationState.isLoadingRenew = false;
        state.renewMyApplicationState.loadingError = payload;
      });
  },
});


export const { updateUpgradeRenewMyAppState, openDrawer, closeDrawer } = ApplicationServiceSlice.actions;
export default ApplicationServiceSlice.reducer;