import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { postServiceInCart } from "./cartThunks";

interface CartState {
    isLoading: boolean;
    cartLoadingError?: string;
    isCartLoading: boolean;
    success?: boolean;
    service_id?: string;
}

const initialState: CartState = {
    isLoading: false,
    cartLoadingError: undefined,
    isCartLoading: false,
    success: undefined,
    service_id: undefined,
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        postCart: (state) => {
            state.isCartLoading = true;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(postServiceInCart.fulfilled, (state) => {
                state.isCartLoading = false;
                state.success = true;
            })
            .addCase(postServiceInCart.rejected, (state, action: PayloadAction<any>) => {
                state.isCartLoading = false;
                state.success = false;
                state.cartLoadingError = action.payload || "Failed to add service to cart";
            });
    },
});

export const { postCart } = cartSlice.actions;
export default cartSlice.reducer;
