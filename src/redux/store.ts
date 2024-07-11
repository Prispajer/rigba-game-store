import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./slices/productSlice";
import utilityReducer from "./slices/utilitySlice";
import gamesFilterReducer from "./slices/gamesFilterSlice";

export const store = configureStore({
  reducer: {
    product: productReducer,
    utility: utilityReducer,
    gamesFilter: gamesFilterReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
