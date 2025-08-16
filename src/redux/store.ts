import { configureStore } from "@reduxjs/toolkit";
import localStorageReducer from "./slices/localStorage/localStorageSlice";
import uiReducer from "./slices/ui/uiSlice";
import productFilterReducer from "../features/products/redux/slices/filters/filtersSlice";
import productPublishersReducer from "../features/products/redux/slices/publishers/publishersSlice";
import productGenresReducer from "../features/products/redux/slices/genres/genresSlice";
import productStoresReducer from "../features/products/redux/slices/stores/storesSlice";
import productPlatformsReducer from "../features/products/redux/slices/platforms/platformsSlice";
import cartReducer from "../features/cart/redux/slices/cart/cartSlice";
import userWishListReducer from "../features/wishlist/redux/slices/wishlist/wishlistSlice";
import reviewsReducer from "../features/reviews/redux/slices/reviews/reviewsSlice";
import userProductHistoryReducer from "../features/history/redux/slices/productHistory/productHistorySlice";
import userOrderHistoryReducer from "../features/history/redux/slices/orderHistory/orderHistorySlice";
import paginationReducer from "./slices/pagination/paginationSlice";
import notificationReducer from "./slices/notification/notificationSlice";

export const store = configureStore({
  reducer: {
    localStorage: localStorageReducer,
    ui: uiReducer,
    productFilter: productFilterReducer,
    productPublishers: productPublishersReducer,
    productGenres: productGenresReducer,
    productStores: productStoresReducer,
    productPlatforms: productPlatformsReducer,
    cart: cartReducer,
    userWishList: userWishListReducer,
    reviews: reviewsReducer,
    userProductHistory: userProductHistoryReducer,
    userOrderHistory: userOrderHistoryReducer,
    pagination: paginationReducer,
    notification: notificationReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
