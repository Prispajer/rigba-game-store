import { PaginationState } from "./pagination.types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: PaginationState = {
    currentPage: 1,
    totalPages: 0,
};

const paginationSlice = createSlice({
    name: "pagination",
    initialState,
    reducers: {
        showPagination: (state, action: PayloadAction<PaginationState>) => {
            state.currentPage = action.payload.currentPage;
            state.totalPages = action.payload.totalPages;
        },
        goToPage: (state, action: PayloadAction<number>) => {
            state.currentPage = action.payload;
        },
        nextPage: (state) => {
            if (state.totalPages > 0 && state.currentPage < state.totalPages) {
                state.currentPage = state.currentPage + 1;
            }
        },
        prevPage: (state) => {
            if (state.currentPage > 1) {
                state.currentPage = state.currentPage - 1;
            }
        },
    },
});

export const {
    showPagination,
    goToPage,
    nextPage,
    prevPage,
} = paginationSlice.actions;

export default paginationSlice.reducer;