import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SearchState } from "@/redux/slices/search/search.types";

const initialState: SearchState = {
    searchGenreText: "",
    searchPlatformText: "",
    searchPublisherText: "",
    searchStoreText: "",
    searchWishlistText: "",
    compartmentNumberOne: null,
    compartmentNumberTwo: null,
};

const searchSlice = createSlice({
    name: "search",
    initialState,
    reducers: {
        setSearchText: (
            state,
            action: PayloadAction<{ key: keyof SearchState; value: SearchState[keyof SearchState] }>
        ) => {
            const { key, value } = action.payload;
            state[key] = value;
        },
        clearSearchText: (state, action: PayloadAction<{ key: keyof SearchState }>) => {
            const key = action.payload.key;
            state[key] = typeof state[key] === "string" ? "" : null;
        },
    },
});

export const {
    setSearchText,
    clearSearchText
} = searchSlice.actions;

export default searchSlice.reducer;