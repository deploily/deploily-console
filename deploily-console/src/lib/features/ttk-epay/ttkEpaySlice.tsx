import { calculateRemainingSubscriptionValue } from "@/lib/utils/subscriptionUtils";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RenewTtkEpayState, TtkEpayByIdState, UpdateTtkEpayState, UpgradeTtkEpayState, UpgradeTtkEpaySubscriptionState } from "./ttkEpayInterface";
import { fetchTtkEpayById, renewTtkEpay, updateTtkEpay, upgradeTtkEpay } from "./ttkEpayThunks";

interface TtkEpayState {
  ttkEpayById: TtkEpayByIdState;
  updateTtkEpay: UpdateTtkEpayState;
  upgradeTtkEpay: UpgradeTtkEpayState;
  renewTtkEpay: RenewTtkEpayState;
  upgradeTtkEpaySubscriptionState: UpgradeTtkEpaySubscriptionState;
  openDrawer: boolean;
  servicePlan: any;
  vpsPlan: any;


}

const initialState: TtkEpayState = {

  ttkEpayById: {
    ttkEpayById: undefined,
    isLoading: false,
    loadingError: null,
  },
  updateTtkEpay: {
    updateTtkEpay: undefined,
    isLoadingUpdate: false,
    loadingError: null,
  },
  upgradeTtkEpay: {
    upgradeTtkEpay: undefined,
    isLoadingUpgrade: false,
    loadingError: null,
  },
  renewTtkEpay: {
    renewTtkEpay: undefined,
    isLoadingRenew: false,
    loadingError: null,
  },
  upgradeTtkEpaySubscriptionState: {
    duration: 3,
    price: 0,
    resource_service_plan: undefined,
    // resource_service_plan_id: undefined,
    app_service_plan: undefined,
    // service_plan_selected_id: undefined,
    totalAmount: 0,
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
const TtkEpaySlice = createSlice({
  name: "ttkEpay",
  initialState,
  reducers: {

    upgradeAppSubscriptionState: (state, action: PayloadAction<any>) => {
      let updatedState: UpgradeTtkEpaySubscriptionState = {
        ...state.upgradeTtkEpaySubscriptionState,
        ...action.payload
      };

      let updatedAmount = 0;
      if (updatedState.app_service_plan !== undefined) {
        updatedAmount = updatedState.duration * updatedState.app_service_plan.price;

        if (updatedState.resource_service_plan !== undefined) {
          updatedAmount += updatedState.duration * updatedState.resource_service_plan.price;
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

        updatedAmount =updatedAmount-oldAppRemaining;
      }

      // 3. Apply promo discount if exists

      if (updatedState.promoCodeRate != undefined) {
        updatedState = { ...updatedState, promoColor: "green" }
        updatedAmount = updatedAmount - ((updatedAmount * (updatedState.promoCodeRate || 0)) / 100);
      }
      updatedState = { ...updatedState, totalAmount: updatedAmount }
      if (updatedState?.selectedProfile != undefined) {
        if ((updatedState?.selectedProfile.balance - updatedState.totalAmount) >= 0) {
          updatedState.isBalanceSufficient = true;
        } else {
          updatedState.isBalanceSufficient = false;
        }
      }
      // 4. Ensure amount isn't negative
      updatedAmount = Math.max(0, Math.round(updatedAmount * 100) / 100);

      updatedState.totalAmount = updatedAmount;


      state.upgradeTtkEpaySubscriptionState = updatedState;
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


      .addCase(fetchTtkEpayById.pending, (state) => {
        state.ttkEpayById.isLoading = true;
      })
      .addCase(fetchTtkEpayById.fulfilled, (state, action) => {
        state.ttkEpayById.isLoading = false;
        state.ttkEpayById.loadingError = null;
        state.ttkEpayById.ttkEpayById = action.payload.result;
      })
      .addCase(fetchTtkEpayById.rejected, (state, { payload }) => {
        state.ttkEpayById.isLoading = false;
        state.ttkEpayById.loadingError = payload;
      })

      .addCase(updateTtkEpay.pending, (state) => {
        state.updateTtkEpay.isLoadingUpdate = true;
      })
      .addCase(updateTtkEpay.fulfilled, (state, action) => {
        state.updateTtkEpay.isLoadingUpdate = false;
        state.updateTtkEpay.loadingError = null;
        state.updateTtkEpay.updateTtkEpay = action.payload;

      })
      .addCase(updateTtkEpay.rejected, (state, { payload }) => {
        state.updateTtkEpay.isLoadingUpdate = false;
        state.updateTtkEpay.loadingError = payload;
      })
      .addCase(upgradeTtkEpay.pending, (state) => {
        state.upgradeTtkEpay.isLoadingUpgrade = true;
      })
      .addCase(upgradeTtkEpay.fulfilled, (state, action) => {
        state.upgradeTtkEpay.isLoadingUpgrade = false;
        state.upgradeTtkEpay.loadingError = null;
        state.upgradeTtkEpay.upgradeTtkEpay = action.payload;
      })
      .addCase(upgradeTtkEpay.rejected, (state, { payload }) => {
        state.upgradeTtkEpay.isLoadingUpgrade = false;
        state.upgradeTtkEpay.loadingError = payload;
      })
      .addCase(renewTtkEpay.pending, (state) => {
        state.renewTtkEpay.isLoadingRenew = true;
      })
      .addCase(renewTtkEpay.fulfilled, (state, action) => {
        state.renewTtkEpay.isLoadingRenew = false;
        state.renewTtkEpay.loadingError = null;
        state.renewTtkEpay.renewTtkEpay = action.payload;
      })
      .addCase(renewTtkEpay.rejected, (state, { payload }) => {
        state.renewTtkEpay.isLoadingRenew = false;
        state.renewTtkEpay.loadingError = payload;
      });


  },
});

export const { upgradeAppSubscriptionState, openDrawer, closeDrawer } = TtkEpaySlice.actions;
export default TtkEpaySlice.reducer;