import { createSlice } from "@reduxjs/toolkit";
import { CartLineByIdInterface, CartLineResponse } from "./cartLineInterface";
import { fetchCartLineById, fetchCartLines, generateTokenThunk } from "./cartLineThunks";

interface CartLineState {
    cartLineResponse?: CartLineResponse;
    isLoading: boolean;
    cartLineLoadingError?: any;
    cartLineLoading: boolean;
    currentCartLine?: CartLineByIdInterface;
    cartLine_id?: number;
    generateTokenLoading?: boolean;
    generatedToken?: string;
    generateTokenFailed?: boolean;
}

const initialState: CartLineState = {
    cartLineResponse: undefined,
    isLoading: false,
    cartLineLoadingError: undefined,
    cartLineLoading: false,
    currentCartLine: undefined,
    cartLine_id: undefined,
    generateTokenLoading: undefined,
    generatedToken: undefined,
    generateTokenFailed: undefined,
}
const CartLineSlice = createSlice({
    name: "cartLine",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCartLines.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchCartLines.fulfilled, (state, action) => {
                state.isLoading = false;
                state.cartLineLoadingError = null;
                const result = action.payload.ids.map((id: number, index: any) =>
                    Object.assign({}, { id: id }, action.payload.result[index]),
                );
                const payload = Object.assign({}, action.payload, { result: result });
                state.cartLineResponse = payload;
            })
            .addCase(fetchCartLines.rejected, (state, { payload }) => {
                state.isLoading = false;
                state.cartLineLoadingError = payload;
            })
            //CHECK IF CART LINE EXIST OR NOT
            .addCase(fetchCartLineById.pending, (state) => {
                state.cartLineLoading = true;
                state.cartLineLoadingError = null;
            })
            .addCase(fetchCartLineById.fulfilled, (state, action) => {
                state.cartLineLoading = false;
                state.cartLineLoadingError = null;
                state.currentCartLine = { ...action.payload.result, ...{ id: action.payload.id } };
                state.cartLine_id = action.payload.id;
            })
            .addCase(fetchCartLineById.rejected, (state, { payload }) => {
                state.cartLineLoading = false;
                state.cartLineLoadingError = payload;
            })   //GENRATE API TOKEN 
            .addCase(generateTokenThunk.pending, (state) => {
                state.generateTokenLoading = true;
                state.generatedToken = undefined;
            })
            .addCase(generateTokenThunk.fulfilled, (state, action) => {
                state.generateTokenLoading = false;
                state.generatedToken = action.payload;
            })
            .addCase(generateTokenThunk.rejected, (state) => {
                state.generateTokenLoading = false;
                state.generateTokenFailed = true;
            });
    },
});
export default CartLineSlice.reducer;
