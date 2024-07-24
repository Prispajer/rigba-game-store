import { configureStore } from "@reduxjs/toolkit";
import localStorageReducer from "./slices/localStorageSlice";
import utilityReducer from "./slices/utilitySlice";
import gamesFilterReducer from "./slices/gamesFilterSlice";
import gamesPublishersReducer from "./slices/gamesPublishersSlice";
import gamesGenresReducer from "./slices/gamesGenresSlice";
import gamesStoresReducer from "./slices/gamesStoresSlice";
import gamesPlatformsReducer from "./slices/gamesPlatformsSlice";

export const store = configureStore({
  reducer: {
    localStorage: localStorageReducer,
    utility: utilityReducer,
    gamesFilter: gamesFilterReducer,
    gamesPublishers: gamesPublishersReducer,
    gamesGenres: gamesGenresReducer,
    gamesStores: gamesStoresReducer,
    gamesPlatforms: gamesPlatformsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
