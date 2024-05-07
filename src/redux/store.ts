import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import productReducer from "./slices/productSlice";
import utilitySlice from "./slices/utilitySlice";
import fetchSlice from "./slices/fetchSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    product: productReducer,
    utility: utilitySlice,
    fetch: fetchSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
