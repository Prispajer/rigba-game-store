import { configureStore } from "@reduxjs/toolkit";
import localStorageReducer from "./slices/localStorageSlice";
import utilityReducer from "./slices/utilitySlice";
import productFilterReducer from "./slices/productFiltersSlice";
import productPublishersReducer from "./slices/productPublishersSlice";
import productGenresReducer from "./slices/productGenresSlice";
import productStoresReducer from "./slices/productStoresSlice";
import productPlatformsReducer from "./slices/productPlatformsSlice";
import userCartReducer from "./slices/userCartSlice";
import userWishListReducer from "./slices/userWishListSlice";
import userReviewsReducer from "./slices/userReviewsSlice";
import userProductHistoryReducer from "./slices/userProductHistorySlice";
import userOrderHistoryReducer from "./slices/userOrderHistorySlice";
import paginationReducer from "./slices/paginationSlice";

export const store = configureStore({
  reducer: {
    localStorage: localStorageReducer,
    utility: utilityReducer,
    productFilter: productFilterReducer,
    productPublishers: productPublishersReducer,
    productGenres: productGenresReducer,
    productStores: productStoresReducer,
    productPlatforms: productPlatformsReducer,
    userCart: userCartReducer,
    userWishList: userWishListReducer,
    userReviews: userReviewsReducer,
    userProductHistory: userProductHistoryReducer,
    userOrderHistory: userOrderHistoryReducer,
    pagination: paginationReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
