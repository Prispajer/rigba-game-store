import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CheckoutStep, UiState } from "@/redux/slices/ui/ui.types";

const initialState: UiState = {
    resolution: true,
    authSidebar: false,
    navSidebar: false,
    accountSidebar: false,
    profileModal: false,
    cartModal: false,
    searchBarModal: false,
    gameScreenshotModal: false,
    publishersModal: false,
    platformsModal: false,
    genresModal: false,
    storesModal: false,
    sortModal: false,
    sortAndFilterModal: false,
    twoFactorModal: false,
    sortMenu: true,
    priceMenu: true,
    publishersMenu: true,
    platformsMenu: true,
    genresMenu: true,
    storesMenu: true,
    checkoutStep: CheckoutStep.Checkout,
};

const uiSlice = createSlice({
    name: "ui",
    initialState,
    reducers: {
        setElement: (state, action: PayloadAction<{ key: keyof UiState, value: UiState[keyof UiState] }>) => {
            const { key, value } = action.payload;
            state[key] = value;
        },
        showElement: (state, action: PayloadAction<keyof UiState>) => {
            const element = action.payload;
            state[element] = true;
        },
        hideElement: (state, action: PayloadAction<keyof UiState>) => {
            const element = action.payload;
            state[element] = false;
        },
        toggleElement: (state, action: PayloadAction<keyof UiState>) => {
            const element = action.payload;
            state[element] = !state[element];
        },
    },
});

export const {
    setElement,
    showElement,
    hideElement,
    toggleElement,
} = uiSlice.actions;

export default uiSlice.reducer;
