import { configureStore } from "@reduxjs/toolkit";
import localStorageReducer from "./slices/localStorage/localStorageSlice";
import uiReducer from "./slices/ui/uiSlice";
import productFilterReducer from "../features/products/redux/slices/filters/filtersSlice";
import publishersReducer from "../features/products/redux/slices/publishers/publishersSlice";
import genresReducer from "../features/products/redux/slices/genres/genresSlice";
import storesReducer from "../features/products/redux/slices/stores/storesSlice";
import platformsReducer from "../features/products/redux/slices/platforms/platformsSlice";
import cartReducer from "../features/cart/redux/slices/cart/cartSlice";
import wishlistReducer from "../features/wishlist/redux/slices/wishlist/wishlistSlice";
import reviewsReducer from "../features/reviews/redux/slices/reviews/reviewsSlice";
import productHistoryReducer from "../features/history/redux/slices/productHistory/productHistorySlice";
import orderHistoryReducer from "../features/history/redux/slices/orderHistory/orderHistorySlice";
import paginationReducer from "./slices/pagination/paginationSlice";
import notificationReducer from "./slices/notification/notificationSlice";

export const store = configureStore({
  reducer: {
    localStorage: localStorageReducer,
    ui: uiReducer,
    productFilter: productFilterReducer,
    publishers: publishersReducer,
    genres: genresReducer,
    stores: storesReducer,
    platforms: platformsReducer,
    cart: cartReducer,
    wishlist: wishlistReducer,
    reviews: reviewsReducer,
    productHistory: productHistoryReducer,
    orderHistory: orderHistoryReducer,
    pagination: paginationReducer,
    notification: notificationReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
