import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./slices/productSlice";
import utilityReducer from "./slices/utilitySlice";
import productFetchAndFilterSliceReducer from "./slices/productFetchAndFilterSlice";

export const store = configureStore({
  reducer: {
    product: productReducer,
    utility: utilityReducer,
    productFetchAndFilter: productFetchAndFilterSliceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
