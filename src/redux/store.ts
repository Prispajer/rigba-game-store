import { configureStore } from "@reduxjs/toolkit";
import localStorageCartReducer from "../features/cart/redux/slices/localStorageCart/localStorageCartSlice";
import localStorageWishlistReducer from "../features/cart/redux/slices/localStorageCart/localStorageCartSlice";
import uiReducer from "./slices/ui/uiSlice";
import productFilterReducer from "../features/products/redux/slices/filters/filtersSlice";
import publishersReducer from "../features/products/redux/slices/publishers/publishersSlice";
import genresReducer from "../features/products/redux/slices/genres/genresSlice";
import storesReducer from "../features/products/redux/slices/stores/storesSlice";
import platformsReducer from "../features/products/redux/slices/platforms/platformsSlice";
import userCartReducer from "../features/cart/redux/slices/userCart/userCartSlice";
import userWishlistReducer from "../features/wishlist/redux/slices/userWishlist/userWishlistSlice";
import reviewsReducer from "../features/reviews/redux/slices/userReviews/userReviewsSlice";
import productHistoryReducer from "../features/history/redux/slices/productHistory/productHistorySlice";
import orderHistoryReducer from "../features/history/redux/slices/orderHistory/orderHistorySlice";
import paginationReducer from "./slices/pagination/paginationSlice";
import notificationReducer from "./slices/notification/notificationSlice";

export const store = configureStore({
  reducer: {
    localStorageCart: localStorageCartReducer,
    localStorageWishlist: localStorageWishlistReducer,
    ui: uiReducer,
    productFilter: productFilterReducer,
    publishers: publishersReducer,
    genres: genresReducer,
    stores: storesReducer,
    platforms: platformsReducer,
    userCart: userCartReducer,
    userWishlist: userWishlistReducer,
    reviews: reviewsReducer,
    productHistory: productHistoryReducer,
    orderHistory: orderHistoryReducer,
    pagination: paginationReducer,
    notification: notificationReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
