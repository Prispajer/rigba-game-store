import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import productReducer from "./slices/productSlice";
import utilityReducer from "./slices/utilitySlice";
import fetchReducer from "./slices/fetchSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    product: productReducer,
    utility: utilityReducer,
    fetch: fetchReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
