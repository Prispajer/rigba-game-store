import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import productReducer from "./slices/productSlice";
import utilityReducer from "./slices/utilitySlice";
import utilitySlice from "./slices/utilitySlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    product: productReducer,
    utility: utilitySlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
